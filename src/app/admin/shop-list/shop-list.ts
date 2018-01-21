import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ShopsService } from '../../shared/services/shops/shops.service';

@Component({
  selector: 'rg-shop-list',
  templateUrl: './shop-list.html'
})
export class ShopList {
  shops = [];
  noShopsMessage = '';
  errorMessage = '';
  lon:number ;
  img:number;
  errorLocationMessage='';
  lat:number;
  location:{};
  constructor(private shopService: ShopsService,private router:Router) {

  }
  ngOnInit() {
    
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                this.location = position.coords;
                this.lat = position.coords.latitude;
                this.lon = position.coords.longitude;
                console.log("dataaaaa : " + this.lat);
                this.getShops(this.lat, this.lon);
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
            this.errorLocationMessage = " Geolocation is not supported by this browser";
        }
    }
    
    getShops(lat: number, lon: number) {
        console.log("data : " + this.lat);
        this.shopService.getShops(lat, lon)
            .subscribe(data => {
                if (data.length) {
                    this.shops = data;
                } else {
    
                    this.noShopsMessage = 'No shop found';
                }
            }, error => {
                this.errorMessage = error;
            });
    
    }
    
    
    likeShop(shop: string) {
    
        console.log("getteing data");
        this.shopService.likeShop(shop)
            .subscribe(data => {
                if (data.length) {
                    console.log("succes add new liked shop" + JSON.stringify(data));
                } else {
                    console.log("bad  request");
                }
            }, error => {
                console.log("bad  res");
                this.errorMessage = error;
            });
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                this.location = position.coords;
                this.lat = position.coords.latitude;
                this.lon = position.coords.longitude;
                this.getShops(this.lat, this.lon);
            });
        }
    }
    
    DislikeShop(shop: string) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                this.location = position.coords;
                this.lat = position.coords.latitude;
                this.lon = position.coords.longitude;
    
    
            });
        }
      
        this.shopService.dislikeShop(shop)
            .subscribe(data => {
                this.getShops(this.lat, this.lon);
            }, error => {
                this.errorMessage = error;
            });
    
    }
    
    
    }