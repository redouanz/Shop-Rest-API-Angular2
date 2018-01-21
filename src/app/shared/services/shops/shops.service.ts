import { Component, Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import * as AppConstants from '../../constants';
@Injectable()
export class ShopsService {
    private apiHeaders = new Headers({
        'Content-Type': 'application/json'
    });

    constructor(private http: Http) {

    }

    getShops(lat: number, lon: number) {
        const shopsUrl = AppConstants.apiUrl + 'shop/nearetShop?user=' + JSON.parse(localStorage.getItem('user')).username + "&lon=" + lon + "&lat=" + lat;
        return this.http.post(shopsUrl,  { headers: this.apiHeaders })
            .map(res => res.json())
            .catch(this.handleError);
    }

    likeShop(shop: string) {

        const prefredPrefredShopsUrl = AppConstants.apiUrl + 'shop/add_perfered?user=' + JSON.parse(localStorage.getItem('user')).username + '&shop=' + shop;
        return this.http.post(prefredPrefredShopsUrl, {})
            .catch(this.handleError);
    }
    dislikeShop(shop: string) {

        const prefredPrefredShopsUrl = AppConstants.apiUrl + 'shop/add_disliked?user=' + JSON.parse(localStorage.getItem('user')).username + '&shop=' + shop;
        console.log(prefredPrefredShopsUrl);
        return this.http.post(prefredPrefredShopsUrl, {})
            .catch(this.handleError);
    }

    handleError(error) {
        return Observable.throw(error.json().message || 'Server error');
    }
}