import { Component } from '@angular/core';
import { StatisticsService } from 'src/app/services/statistics.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent {
  roleCurrentUser!: string; 
  stats: any = {};

  constructor(private userService: UserService,
    private statsService: StatisticsService){
      this.roleCurrentUser = this.userService.getStoredUser().role;  
  }

  ngOnInit(): void {
    this.statsService.getStats().subscribe({
      next: (data) => {this.stats = data;},
      error: (error) => {console.error('Error fetching stats', error);},
    }); 
  }
}
