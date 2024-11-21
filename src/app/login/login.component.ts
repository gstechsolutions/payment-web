import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  userName: string = '';
  password: string = '';

  /**
   *
   */
  constructor(private router: Router) {
    
    
  }
  onSubmit() {
    console.log('Username:', this.userName);
    console.log('Password:', this.password);
    // Add authentication logic here
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
