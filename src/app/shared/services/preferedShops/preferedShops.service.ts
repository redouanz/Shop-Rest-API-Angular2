import { Component, Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import * as AppConstants from '../../constants';
@Injectable()
export class PreferedShopsService {
    private apiHeaders = new Headers({
        'Content-Type': 'application/json'
    });

    constructor(private http: Http) {

    }

    getPrefredShops(lat: number, lon: number) {
        const prefredPrefredShopsUrl = AppConstants.apiUrl + 'shop/get_perfered?user=' + JSON.parse(localStorage.getItem('user')).username + "&lon=" + lon + "&lat=" + lat;
        return this.http.post(prefredPrefredShopsUrl, {})
            .map(res => res.json())
            .catch(this.handleError);
    }
    removePrefredShop(shop: string) {
        let user = JSON.parse(localStorage.getItem('user')).username;
        const prefredPrefredShopsUrl = AppConstants.apiUrl + 'shop/remove_perfered?user=' + user + '&shop=' + shop;
        return this.http.post(prefredPrefredShopsUrl, {})
            .map(res => res.json())
            .catch(this.handleError);
    }
    handleError(error) {
        return Observable.throw(error.json().message || 'Server error');
    }
    likeShop(shop: string) {

        const prefredPrefredShopsUrl = AppConstants.apiUrl + 'shop/add_perfered?user=' + JSON.parse(localStorage.getItem('user')).username + '&shop=' + shop;
        return this.http.post(prefredPrefredShopsUrl, {})
            .map(res => res.json())
            .catch(this.handleError);
    }
}