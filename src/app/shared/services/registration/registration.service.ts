import { Component, Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import * as AppConstants from '../../constants';
@Injectable()
export class RegistrationService {
    private apiHeaders = new Headers({
        'Content-Type': 'application/json'
    });

    constructor(private http: Http) {

    }

    registerUser(user) {
        const registerUrl = AppConstants.apiUrl + 'api/register';
        return this.http.post(registerUrl, JSON.stringify(user), {
                headers: this.apiHeaders
            })
            .map(res => res.json())
            .catch(this.handleError);
    }

    handleError(error) {
        return Observable.throw(error.json().message || 'Server error');
    }
}