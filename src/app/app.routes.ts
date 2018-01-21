
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './shared/auth/auth.guard';

import { Home } from './home/home';
import { Register } from './register/register';
import { Login } from './login/login';
import {  ShopList } from './admin/shop-list/shop-list';
import {  PrefredShopList } from './admin/preferedShop-list/preferedShop-list';


export const ROUTES: Routes = [
  { path: '',      component: Home },
  { path: 'home',  component: Home },

  { path: 'register', component: Register },
  { path: 'login', component: Login },

  { path: 'admin/shoplist', component: ShopList, canActivate: [AuthGuard]},
  { path: 'admin/prefredShoplist', component: PrefredShopList, canActivate: [AuthGuard]},
  { path: '**',    component: Home }
];
