import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { Router } from '@angular/router';

import { AppRoutingModule, appRouterComponents } from './app.routing.module';
import { ProductsModule } from './products/products.module';
import { CartModule } from './cart/cart.module';

import { AppComponent } from './app.component';
import { HelloComponent } from './components/hello/hello.component';
import { GeneratorService, LocalStorageService, ConfigOptionsService, ConstantsService, Random5, RandomN } from './services/';
import { ConfigOptionsComponent } from './components/config-options/config-options.component';
import { ConstantsComponent } from './components/constants/constants.component';
import { GeneratorComponent } from './components/generator/generator.component';
import { LocalStorageComponent } from './components/local-storage/local-storage.component';
import { HighlightDirective } from './directives/highlight.directive';

const TaskManager = new ConstantsService();

@NgModule({
  declarations: [
    AppComponent,
    HelloComponent,
    ConfigOptionsComponent,
    ConstantsComponent,
    GeneratorComponent,
    LocalStorageComponent,
    HighlightDirective,
    appRouterComponents
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ProductsModule,
    CartModule,
    AppRoutingModule
  ],
  exports: [
    AppComponent
  ],
  providers: [
    LocalStorageService,
    ConfigOptionsService,
    { provide: ConstantsService, useValue: TaskManager },
    GeneratorService,
    { provide: Random5, useFactory:  RandomN(5), deps: [ GeneratorService ] }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(router: Router) {
    // Отображение структуры роутинга:
    console.log('Routes: ', JSON.stringify(router.config, undefined, 2));
  }
}
