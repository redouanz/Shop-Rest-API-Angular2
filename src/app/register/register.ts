import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistrationService } from '../shared/services/registration/registration.service';
import { RegistrationValidator } from '../shared/validation/registrationvalidator';
import { Login } from '../login/login';

@Component({
  selector: 'rg-register',
  templateUrl:'./register.html'
})
export class Register {
  public errorMessage = '';
  public successMessage = '';

  private form: FormGroup;
  private username = new FormControl(
    '',
    Validators.compose([
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(50),
      
    ])
  );
  private password = new FormControl('',
    Validators.compose([
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(50),
      RegistrationValidator.validatePassword
    ])
  );

  private email = new FormControl('',
  Validators.compose([
    Validators.required,
    Validators.maxLength(50),
    RegistrationValidator.validateEmail
  ])
);

  constructor(private registrationService: RegistrationService,private router: Router, private formBuilder: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
    console.log('hello `Register` component');
  }

  register() {
    this.registrationService.registerUser(this.form.value)
        .subscribe(data => {
          if (data) {
            this.errorMessage = '';
            this.successMessage = 'Account successfully created';
            this.router.navigate(['admin/shoplist']);
          } else {
            this.errorMessage = 'Error';
            this.successMessage = '';
          }
        }, error => {
          this.errorMessage = error;
          this.successMessage = '';
        });
  }

  createForm() {
    this.form = this.formBuilder.group({
      username:  this.email,
      password: this.password
    });
  }
}
