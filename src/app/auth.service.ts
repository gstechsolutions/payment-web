import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from './authModels/userModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public errorMessage: string = '';
  public logsMessage: string = '' ;
  private webApiUri: string = 'http://localhost:5137/api';

  constructor(private http: HttpClient) { }

  public IisertNewUserModel(request: UserModel) : Observable<any> {

    const url = `${this.webApiUri}/auth/user/insert`;
    
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json'})
    };

    return this.http.post(url, request, httpOptions);
  }
}
