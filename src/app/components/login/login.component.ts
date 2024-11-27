import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  showLoader: boolean = false; 
  constructor(private authService: AuthService, 
    private userService: UserService,
    private router: Router
  ) {
    if(this.authService.isAuthenticated()) {
      this.router.navigate(['/']); 
    } 
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  checkUser() { 
    this.showLoader = true; 
    this.authService.login(this.loginForm.getRawValue()).subscribe({
      next: (data) => {
        if (data && data.token) {
          this.authService.setToken(data.token); 
          this.userService.getCurrentUser().subscribe({
            next: (user) => {
              this.showLoader = false; 
              this.userService.setUser(user);
              this.router.navigate(['/job']);
            },
            error: (err) => {
              this.showLoader = false; 
              console.error('Erreur lors de la récupération des informations utilisateur', err);
            }
          });
        }
      },
      error: (err) => {
        this.showLoader = false;
        console.log(err.message)},
    });
  }
}
