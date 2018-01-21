import { Component } from '@angular/core';

import { Login } from '../login/login';

import { AuthService } from '../shared/auth/auth.service';

@Component({
  selector: 'rg-home',
 
  templateUrl: './home.html'
})
export class Home {
  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    
  }

}
