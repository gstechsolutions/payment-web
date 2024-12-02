import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from '../authModels/userModel';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as CryptoJS from 'crypto-js';
import { LoginTokenResponseModel } from '../authModels/login-token-response.model';

@Component({
  selector: 'app-login',
  standalone: false,
  
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  userName: string = '';
  password: string = '';
  user = new UserModel();
  // encryptionKey: string = 'your-encryption-key-5h0u1D83-C0mP73x'; // Replace with a securely stored key
  encryptionKey: string = 'your-encryption-key'; // Replace with a securely stored key

  private key = CryptoJS.enc.Utf8.parse('1234567890123456'); // 16 bytes key
  private iv = CryptoJS.enc.Utf8.parse('1234567890123456');  // 16 bytes IV

  token = new LoginTokenResponseModel();

  /**
   *
   */
  constructor(private router: Router,
    private snackBar: MatSnackBar,
    private authSvc: AuthService
  ) {
    
    
  }
  onSubmit() {
    console.log('Username:', this.userName);
    console.log('Password:', this.password);
    // Add authentication logic here

    this.user.userName = this.userName;
    this.user.password = this.password;
    

    let encryptedData = this.encryptPassword(this.user);
    this.authSvc.login(encryptedData).subscribe(
      (data: LoginTokenResponseModel) => {
        if (data != null && data.requestId != 2){
          this.token = data;
          this.snackBar.open(`Login successful for ${this.token.userName}.`, '', { duration: 3000, verticalPosition: 'top' })
        }
        else{
          this.snackBar.open(`Error login in ${this.user.userName}.`, '', { duration: 3000, verticalPosition: 'top' })
        }

    })


  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  encryptPassword(userModel: UserModel): string {


    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(userModel), this.key, {
      iv: this.iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    return encrypted.toString();    

  }
}
