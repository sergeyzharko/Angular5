import { Component, OnInit, OnDestroy } from '@angular/core';
import { AutoUnsubscribe } from './../decorators';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { DialogService } from './../services';
import { Subscription } from 'rxjs/Subscription';

import { CanComponentDeactivate } from './../guards/can-component-deactivate.interface';
import { User } from './../models';
import { UserArrayService, AuthService } from './../services';
import { CustomValidators } from './../validators/custom.validators';

@Component({
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
@AutoUnsubscribe()
export class UserFormComponent implements OnInit, OnDestroy, CanComponentDeactivate {
  countries: Array<string> = ['Ukraine', 'Armenia', 'Belarus', 'Hungary', 'Kazakhstan', 'Poland', 'Russia'];
  user: User;
  originalUser: User;
  private subscription: Subscription[] = [];
  admin = false;
  errorMessage: string;
  userForm: FormGroup;
  emailMessage: string;
  private validationMessages = {
    required: 'Please enter your email address.',
    pattern: 'Please enter a valid email address.',
    maxlength: 'Email is too long.'
  };

  constructor(
    private userArrayService: UserArrayService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private dialogService: DialogService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.user = new User();

    this.admin = this.router.url.includes('admin') ? true : false;

    this.buildForm();
    this.watchValueChanges();

    if (this.admin) {
      // UserResolveGuard
      this.route.data.subscribe(data => {
        this.user = Object.assign(this.user, data.user);
        this.originalUser = Object.assign(this.user, data.user);
        this.setFormValues(this.user);
      });
    } else if (this.authService.isLoggedIn) {
      this.user = this.authService.currentUser;
      this.setFormValues(this.user);
    }

  }

  saveUser() {
    delete this.userForm.value.repeatedPassword;
    console.log(`Saved: ${JSON.stringify(this.userForm.value)}`);
    Object.assign(this.user, this.userForm.value);
    this.user.id ? this.update() : this.register();
  }

  register() {
    this.errorMessage = '';
    const sub = this.userArrayService.getUsers().subscribe(
      users => {
        const correctUser = users.find( sourceUser => this.user.login === sourceUser.login);
        if (correctUser) { this.errorMessage = 'This login is already taken'; } else {
          const sub1 = this.userArrayService.addUser(this.user)
          .subscribe(
            () => {
              if (this.admin) { this.navigate(); } else { this.authService.login(this.user, false); }
            },
            error => console.log(error)
          );
          this.subscription.push(sub1);
        }
      });
    this.subscription.push(sub);
  }

  update() {
    const sub2 = this.userArrayService.updateUser(this.user).subscribe(
      () => {
        this.subscription.push(sub2);
        this.navigate();
      }
    );
  }

  private buildForm() {
    const myValidators = [ Validators.required, Validators.minLength(3), Validators.maxLength(30) ];

    this.userForm = this.fb.group({
      id:                 new FormControl(),
      login:              new FormControl('', {validators: myValidators, updateOn: 'blur'}),
      passwordGroup: this.fb.group({
          password:         new FormControl('', {validators: myValidators, updateOn: 'blur'}),
          repeatedPassword: new FormControl('', {validators: myValidators, updateOn: 'blur'})
        }, {validator: CustomValidators.passwordMatcher}
      ),
      firstName:          new FormControl('', {validators: myValidators, updateOn: 'blur'}),
      lastName:           new FormControl('', {validators: myValidators, updateOn: 'blur'}),
      notification:       new FormControl('Email'),
      email:              new FormControl(''),
      phones:             this.fb.array([this.buildPhone()]),
      street1:            new FormControl('', {validators: myValidators, updateOn: 'blur'}),
      street2:            new FormControl('', {validators: myValidators, updateOn: 'blur'}),
      country:            new FormControl('', {validators: myValidators, updateOn: 'blur'}),
      city:               new FormControl('', {validators: myValidators, updateOn: 'blur'}),
      zip:                new FormControl('', {validators: myValidators, updateOn: 'blur'}),
      isAdmin:            new FormControl(false)
    });
  }

  private setFormValues(user) {
    for ( let i = 1; i < user.phones.length; i++ ) {
      this.addPhone();
    }
    this.userForm.setValue({
      id: user.id,
      login: user.login,
      passwordGroup: {
        password: user.password || '',
        repeatedPassword: user.password || ''
      },
      firstName: user.firstName,
      lastName: user.lastName,
      notification: user.notification || 'email',
      email: user.email || '',
      phones: user.phones || [{ number: '', type: 'Home' }],
      street1: user.street1 || '',
      street2: user.street2 || '',
      country: user.country || '',
      city: user.city || '',
      zip: user.zip || '',
      isAdmin: user.isAdmin
    });
  }

  navigate() {
    if (this.admin) {
      this.originalUser = Object.assign({}, this.user);
      this.user.id
        // optional parameter: http://localhost:4200/users;id=2
        ? this.router.navigate(['admin/users', { id: this.user.id }])
        : this.router.navigate(['admin/users']);
    } else {
      this.router.navigate(['products']);
    }
  }

  private watchValueChanges() {
    this.setNotification('Email');
    const sub1 = this.userForm.get('notification').valueChanges.subscribe(value => this.setNotification(value));
    this.subscription.push(sub1);

    const emailControl = this.userForm.get('email');
    const sub2 = emailControl.valueChanges
      .debounceTime(1000)
      .subscribe(value => this.setMessage(emailControl));
    this.subscription.push(sub2);
  }

  private setMessage(c: AbstractControl) {
    this.emailMessage = '';
    if ((c.touched || c.dirty) && c.errors) {
      this.emailMessage = Object
        .keys(c.errors)
        .map(key => this.validationMessages[key])
        .join(' ');
    }
  }

  private setNotification(notifyVia: string) {
    const phonePattern =
    `\\+(9[976]\\d|8[987530]\\d|6[987]\\d|5[90]\\d|42\\d|3[875]\\d|2[98654321]\\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\\d{1,14}$`;

    console.log(this.phones.controls[0].get('number'));
    // this.phones.controls == this.userForm.get('phones').controls
    // if (!this.userForm.get('phones').controls) {this.userForm.get('phones').controls = []};
    // console.log(this.userForm.get('phones').controls);
    // const phoneControl = this.phones.controls[0];
    const emailControl = this.userForm.get('email');

    if (notifyVia === 'Phone') {
      this.phones.controls.forEach(
        value => value.get('number').setValidators([Validators.required, Validators.pattern(phonePattern), Validators.maxLength(15)])
      );
      emailControl.clearValidators();
    } else {
      emailControl.setValidators([Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+'), Validators.maxLength(10)]);
      this.phones.controls.forEach( value => value.get('number').clearValidators() );
    }
    this.phones.controls.forEach( value => value.get('number').updateValueAndValidity() );
    emailControl.updateValueAndValidity();
  }

  private buildPhone(): FormGroup {
    return this.fb.group({
      number: '',
      type: 'Home'
    });
  }

  get phones(): FormArray {
    return <FormArray>this.userForm.get('phones');
  }

  addPhone(): void {
    this.phones.push(this.buildPhone());
  }

  goBack() {
    let path;
    this.user.id ? path = '../../' : path = '../' ;
    this.router.navigate([path], { relativeTo: this.route});
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    const flags = [];
    for (const key in this.originalUser) {
      if (this.originalUser[key] === this.user[key]) {
        flags.push(true);
      } else {
        flags.push(false);
      }
    }

    if (flags.every(el => el)) {
      return true;
    }

    return this.dialogService.confirm('Discard changes?');
  }

  ngOnDestroy() {
    this.subscription.forEach(sub => sub.unsubscribe());
  }

}
