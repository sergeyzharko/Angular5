import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { Product, Category } from '../../models/';
import { ProductsService } from '../../services/';
import { OrderPipe } from '../../products/pipes/order-by.pipe';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  providers: [OrderPipe]
})
export class ProductListComponent implements OnInit {
  products: Array<Product>;

  selectedName: string;
  direction: boolean;
  private editedProduct: Product;

  constructor( // Reserve the constructor for simple initialization such as wiring constructor parameters to properties.
    public productsService: ProductsService,
    private orderPipe: OrderPipe,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getProducts();

    this.route.paramMap
    .switchMap((params: Params) => this.productsService.getProduct(+params.get('id')))
    .subscribe(
      (product: Product) => {
        this.editedProduct = Object.assign({}, product);
        console.log(`Last time you edit product ${JSON.stringify(this.editedProduct)}`);
      },
      (err) => console.log(err)
    );

  }

  getProducts(): void {
    this.productsService.getProducts()
    .then(products => {
      this.products = products; this.onOrder();
    })
    .catch(() => Promise.reject('Error in getProducts method'));
  }

  onRemove(product): void {
    this.productsService.removeProduct(product);
  }

  onEdit(product): void {
    // const link = `admin/products/edit/${product.id}`;
    // this.router.navigateByUrl(link);

    const link = ['edit', product.id];
    this.router.navigate(link, {relativeTo: this.route});

  }

  onNew(): void {
    this.onEdit({id: 0});
  }

  onOrder() {
    this.products = this.orderPipe.transform(this.products, 'name', Boolean(this.direction));
  }

  isEdited(product: Product) {
    if (this.editedProduct) {
      return product.id === this.editedProduct.id;
    }
    return false;
  }

}
