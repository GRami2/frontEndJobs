import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  roleCurrentUser!: string; 
  constructor(private userService: UserService){
      this.roleCurrentUser = this.userService.getStoredUser().role;  
  }
}
