import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

import { AuthService } from './shared/auth/auth.service';

@Component({
  selector: 'app-root',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.style.css'
  ],
  templateUrl: './app.html'
})
export class App {
  title = 'Registration App';

  constructor(private authService: AuthService, private router: Router) {

  }

  navigateToLogin() {
    this.router.navigate(['login']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }
}


