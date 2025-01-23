import { Component } from '@angular/core';
import { LoginService } from '../../../services/security/login.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email = 'kevin.galarza@sofka.com.co';
  password = '';
  rememberMe = false;
  error = '';
  passwordVisible = false;


  constructor(private authService: LoginService, private router: Router) { }

  login() {
    this.router.navigate(['/systembank']);//este es de prueba nomas

    /* this.error = '';
    this.authService.login(this.email, this.password).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.error = err.message
      },
    }); */
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }
}
