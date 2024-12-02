import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from './authModels/userModel';
import { Observable } from 'rxjs';
import { LoginTokenResponseModel } from './authModels/login-token-response.model';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public errorMessage: string = '';
  public logsMessage: string = '' ;
  private webApiUri: string = 'http://localhost:5137/api';
  private key = CryptoJS.enc.Utf8.parse('1234567890123456'); // 16 bytes key
  private iv = CryptoJS.enc.Utf8.parse('1234567890123456');  // 16 bytes IV

  constructor(private http: HttpClient) { }

  public insertNewUserModel(request: string) : Observable<UserModel> {

    const url = `${this.webApiUri}/auth/user/insert`;
    var payload = {data: request};
    
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json'})
    };

    return this.http.post<UserModel>(url, payload, httpOptions);
  }

  public login(request: string) : Observable<LoginTokenResponseModel> {

    const url = `${this.webApiUri}/auth/login`;
    var payload = {data: request};
    
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json'})
    };

    return this.http.post<LoginTokenResponseModel>(url, payload, httpOptions);
  }

  encryptData(data: any): string {


    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), this.key, {
      iv: this.iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    return encrypted.toString();    

  }
}
