import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PreferedShopsService } from '../../shared/services/preferedShops/preferedShops.service';

@Component({
  selector: 'rg-preferedShop-list',
  templateUrl: './preferedShop-list.html'
})
export class PrefredShopList {
  preferedshops = [];
  noPrefredShopsMessage = '';
  errorLocationMessage = '';
  errorMessage = '';
  lon:number ;
  img:number;
  lat:number;
  location: {};
  constructor(private srefredShopService: PreferedShopsService, private router: Router) {
  }
  
  ngOnInit() {
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(position => {
              this.location = position.coords;
              this.lat = position.coords.latitude;
              this.lon = position.coords.longitude;
              this.getPrefredShops(this.lat, this.lon);
          }, error => {
              switch (error.code) {
                  case error.PERMISSION_DENIED:
                      this.errorLocationMessage = 'Oops !! Enable Location Services';
                      break;
                  case error.POSITION_UNAVAILABLE:
                      this.errorLocationMessage = 'Location information is unavailable.';
                      break;
                  case error.TIMEOUT:
                      this.errorLocationMessage = 'The request to get user location timed out.';
                      break;
                  default:
                      this.errorLocationMessage = 'An unknown error occurred.';
                      break;
              }
          });
      } else {
          this.errorLocationMessage = 'Geolocation is not supported by this browser';
      }
  
  
  }
  
  getPrefredShops(lat: number, lon: number) {
      console.log("getteing data");
      this.srefredShopService.getPrefredShops(lat, lon)
          .subscribe(data => {
              if (data.length) {
                  this.preferedshops = data;
                  console.log("data : " + JSON.stringify(data));
              } else {
                  this.noPrefredShopsMessage = 'No preferd Shop found';
                  this.preferedshops = data;
              }
          }, error => {
  
              this.errorMessage = error;
          });
  }
  
  removePrefredShop(usershop: string) {
     
      this.srefredShopService.removePrefredShop(usershop)
          .subscribe(data => {
              this.getPrefredShops(this.lat, this.lon);
              if (!data) {
                this.noPrefredShopsMessage = 'No prefredShop found';
              } 
  
          }, error => {
              this.errorMessage = error;
          });
  
  
  }
  
  }