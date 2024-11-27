import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registerForm: FormGroup;
  showLoader: boolean = false; 
  constructor(private authService: AuthService, private router: Router) {
    this.registerForm = new FormGroup({
      fullName: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      profileTitle: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  registerUser() {
    this.showLoader = true;
    this.authService.register(this.registerForm.getRawValue()).subscribe({
      next: (data) => {
        console.log(data);
        if (data.id) {
          this.showLoader = false;
          this.router.navigate(['/']);
        }
      },
      error: (err) => {
        this.showLoader = false;
        console.log(err.message);
      },
    });
  }
}
