import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../shared/auth/auth.service';

@Component({
  selector: 'rg-login',
  templateUrl: './login.html'
})
export class Login {
  public errorMessage = '';
  public successMessage = '';

  private form: FormGroup;
  private username = new FormControl('', Validators.required);
  private password = new FormControl('', Validators.required);

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router) {
    this.createForm();
  }
  ngAfterViewInit() {
    (function($) {
      $(document).ready(function() {
          $('.list-inline li > a').click(function() {
              var activeForm = $(this).attr('href') + ' > form';
              
              $(activeForm).addClass('animated fadeIn');
              //set timer to 1 seconds, after that, unload the animate animation
              setTimeout(function() {
                  $(activeForm).removeClass('animated fadeIn');
              }, 1000);
          });
      });
  })(jQuery);
  }
  ngOnInit() {
     

  }

  login() {
   
    this.authService.login(this.form.value)
        .subscribe(data => {
          if (data) {
            this.errorMessage = '';
            this.successMessage = 'Login successful';
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
      username:  this.username,
      password: this.password
    });
  }

  navigateToRegister() {
    this.router.navigate(['register']);
  }
}
