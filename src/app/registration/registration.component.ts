import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from '../authModels/userModel';
import * as CryptoJS from 'crypto-js';
import { RoleEnums } from '../authModels/userRoleEnum';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-registration',
  standalone: false,
  
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent {
  userName: string = '';
  password: string = '';
  role: number = 0; // Default role is user, later allow the user to select from a drop down maybe
  user = new UserModel();
  // encryptionKey: string = 'your-encryption-key-5h0u1D83-C0mP73x'; // Replace with a securely stored key
  encryptionKey: string = 'your-encryption-key'; // Replace with a securely stored key

  private key = CryptoJS.enc.Utf8.parse('1234567890123456'); // 16 bytes key
  private iv = CryptoJS.enc.Utf8.parse('1234567890123456');  // 16 bytes IV

  /**
   *
   */
  constructor(private router: Router,
          private authSvc: AuthService
  ) {    
    
  }
  onRegister() {
    const encryptedPassword = this.encryptPassword(this.password); // Simple encryption
    this.user.userName = this.userName;
    this.user.password = encryptedPassword;
    this.user.roleId = RoleEnums.user;

    console.log('User Registered:', { userName: this.userName, password: encryptedPassword, role: this.role });
    // Add registration logic (API call, etc.) here
    this.insertNewUserModel();
  }

  goToLogin(){
    this.router.navigate(['/login']);
  }

  encryptPassword(password: string): string {


    const encrypted = CryptoJS.AES.encrypt(password, this.key, {
      iv: this.iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    return encrypted.toString();    

    // // Generate random IV for encryption
    // const iv = CryptoJS.lib.WordArray.random(16); // 16 bytes = 128 bits
    
    // // Encrypt the password with the IV and encryption key
    // const encrypted = CryptoJS.AES.encrypt(password, CryptoJS.enc.Utf8.parse(this.encryptionKey), {
    //   iv: iv,
    //   mode: CryptoJS.mode.CBC,
    //   padding: CryptoJS.pad.Pkcs7,
    // });

    // // Convert to Base64 and prepend IV to the encrypted password (as IV is needed for decryption)
    // const ivBase64 = CryptoJS.enc.Base64.stringify(iv);
    // const encryptedPassword = encrypted.toString();

    // // Combine the IV and encrypted password: IV + Encrypted Text
    // return ivBase64 + encryptedPassword;
  }

  /***
   * Call your api service to insert the values into the user table in db
   */
  public insertNewUserModel(){
    this.authSvc.IisertNewUserModel(this.user).subscribe(
      (data: UserModel) => {
        if (data != null && data.requestId != 2){
          this.user = data;
        }

    })
  }
}
