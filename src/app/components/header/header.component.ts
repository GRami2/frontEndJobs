import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  user: any = null; 
  constructor(private authService: AuthService,
    private userService: UserService,  
    private router: Router){
      this.user = this.userService.getStoredUser(); 
  }

  logout(): void{
    this.authService.clearToken(); 
    this.userService.clearUser(); 
    this.router.navigate(['/login']);
  }

}
