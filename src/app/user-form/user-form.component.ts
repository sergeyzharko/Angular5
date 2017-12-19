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
import { CustomValidators } from './../validators';

@Component({
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
@AutoUnsubscribe()
export class UserFormComponent implements OnInit, OnDestroy, CanComponentDeactivate {
  user: User;
  originalUser: User;
  private subscription: Subscription[] = [];
  admin = false;
  errorMessage: string;
  userForm: FormGroup;
  passwordMessage: string;
  private validationMessages = {
    required: 'Please enter your email address.',
    pattern: 'Please enter a valid email address.'
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
    this.setFormValues(this.user);

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
    console.log(this.userForm);
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
    this.userForm = this.fb.group({
      id: new FormControl(),
      login: new FormControl('', {validators: [Validators.required, Validators.minLength(3), Validators.maxLength(20)], updateOn: 'blur'}),
      passwordGroup: this.fb.group({
        password:
          new FormControl('', {validators: [Validators.required, Validators.minLength(3), Validators.maxLength(20)], updateOn: 'blur'}),
        repeatedPassword:
          new FormControl('', {validators: [Validators.required, Validators.minLength(3), Validators.maxLength(20)], updateOn: 'blur'})
      },
    ),
      firstName: new FormControl('', {validators: [
        Validators.required, Validators.minLength(3), Validators.maxLength(20)
      ], updateOn: 'blur'}),
      lastName: new FormControl('', {validators: [
        Validators.required, Validators.minLength(3), Validators.maxLength(20)
      ], updateOn: 'blur'}),
      // notification: 'email',
      email: new FormControl('', {validators: [
        Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+'), Validators.maxLength(30)
      ], updateOn: 'blur'}),
      phones: this.fb.array([this.buildPhone()]),
      address: new FormControl('', {validators: [
        Validators.required, Validators.minLength(3), Validators.maxLength(30)
      ], updateOn: 'blur'}),
      isAdmin: false
    });
  }

  // private createForm() {
  //   this.userForm = new FormGroup({
  //     id: new FormControl(),
  //     login: new FormControl(),
  //     password: new FormControl(),
  //     repeatedPassword: new FormControl(),
  //     firstName: new FormControl(),
  //     lastName: new FormControl(),
  //     email: new FormControl(),
  //     phone: new FormControl(),
  //     address: new FormControl(),
  //     isAdmin: new FormControl(false)
  //   });
  // }

  private setFormValues(user) {
    this.userForm.setValue({
      id: user.id,
      login: user.login,
      passwordGroup: {
        password: user.password || '',
        repeatedPassword: user.password || ''
      },
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email || '',
      phones: user.phones || [{ number: '', type: 'Home' }],
      address: user.address || '',
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
    const sub1 = this.userForm.get('notification').valueChanges
      .subscribe(value => this.setNotification(value));
    this.subscription.push(sub1);

    const emailControl = this.userForm.get('emailGroup.email');
    const sub2 = emailControl.valueChanges
      .debounceTime(1000)
      .subscribe(value => this.setMessage(emailControl));
    this.subscription.push(sub2);
  }

  private setMessage(c: AbstractControl) {
    this.passwordMessage = '';
    if ((c.touched || c.dirty) && c.errors) {
      this.passwordMessage = Object
        .keys(c.errors)
        .map(key => this.validationMessages[key])
        .join(' ');
    }
  }

  private setNotification(notifyVia: string) {
    const phoneControl = this.userForm.get('phone');
    const emailControl = this.userForm.get('emailGroup.email');

    if (notifyVia === 'text') {
      phoneControl.setValidators(Validators.required);
      emailControl.clearValidators();
    } else {
      emailControl.setValidators( [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]);
      phoneControl.clearValidators();
    }
    phoneControl.updateValueAndValidity();
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
