import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from '../authModels/userModel';
import { RoleEnums } from '../authModels/userRoleEnum';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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



  /**
   *
   */
  constructor(private router: Router,
    private snackBar: MatSnackBar,
          private authSvc: AuthService
  ) {    
    
  }
  onRegister() {
    // const encryptedPassword = this.encryptPassword(this.password); // Simple encryption
    this.user.userName = this.userName;
    this.user.password = this.password;
    this.user.roleId = RoleEnums.user;

    // console.log('User Registered:', { userName: this.userName, password: encryptedPassword, role: this.role });
    // Add registration logic (API call, etc.) here
    this.insertNewUserModel();
  }

  goToLogin(){
    this.router.navigate(['/login']);
  }



  /***
   * Call your api service to insert the values into the user table in db
   */
  public insertNewUserModel(){
    let encryptedData = this.authSvc.encryptData(this.user);
    this.authSvc.insertNewUserModel(encryptedData).subscribe(
      (data: UserModel) => {
        if (data != null && data.requestId != 2){
          this.user = data;
          this.snackBar.open(`Registration successful for ${this.user.userName}.`, '', { duration: 3000, verticalPosition: 'top' })
        }
        else{
          this.snackBar.open(`Error registering ${this.user.userName}.`, '', { duration: 3000, verticalPosition: 'top' })
        }

    })
  }
}
