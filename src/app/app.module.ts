import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { removeNgStyles, createNewHosts, createInputTransfer } from '@angularclass/hmr';
import * as $ from 'jquery';
import 'zone.js';
import 'reflect-metadata';

import { ROUTES } from './app.routes';

import { App } from './app.component';
import { AppState, InteralStateType } from './app.service';
import { AuthGuard } from './shared/auth/auth.guard';
import { RegistrationService } from './shared/services/registration/registration.service';
import { UsersService } from './shared/services/users/users.service';

import { ShopsService } from './shared/services/shops/shops.service';
import { PreferedShopsService } from './shared/services/preferedShops/preferedShops.service';
import { AuthService } from './shared/auth/auth.service';

import { Home } from './home/home';
import { Register } from './register/register';
import { Login } from './login/login';

import { ShopList } from './admin/shop-list/shop-list';
import { PrefredShopList } from './admin/preferedShop-list/preferedShop-list';




const APP_PROVIDERS = [
  AppState,
  RegistrationService,
  UsersService,
  ShopsService,
  PreferedShopsService,
  AuthService,
 
  AuthGuard
];

type StoreType = {
  state: InteralStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

@NgModule({
  bootstrap: [ App ],
  declarations: [
    App,
   
    Home,
    Register,
    Login,
 
    ShopList,
    PrefredShopList
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES, { useHash: true })
  ],
  providers: [
   
    APP_PROVIDERS
  ]
})
export class AppModule {
  constructor(public appRef: ApplicationRef, public appState: AppState) {}

  hmrOnInit(store: StoreType) {
    if (!store || !store.state) return;
    console.log('HMR store', JSON.stringify(store, null, 2));
    // set state
    this.appState._state = store.state;
    // set input values
    if ('restoreInputValues' in store) {
      let restoreInputValues = store.restoreInputValues;
      setTimeout(restoreInputValues);
    }

    this.appRef.tick();
    delete store.state;
    delete store.restoreInputValues;
  }

  hmrOnDestroy(store: StoreType) {
    const cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    // save state
    const state = this.appState._state;
    store.state = state;
    // recreate root elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // save input values
    store.restoreInputValues  = createInputTransfer();
    // remove styles
    removeNgStyles();
  }

  hmrAfterDestroy(store: StoreType) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }

}
