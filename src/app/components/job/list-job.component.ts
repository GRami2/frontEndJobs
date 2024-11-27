import { Component } from '@angular/core'; 
import { Job } from 'src/app/models/job';
import { JobService } from 'src/app/services/job.service';
import { UserService } from 'src/app/services/user.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-list-job',
  templateUrl: './list-job.component.html',
  styleUrls: ['./list-job.component.scss'],
})
export class ListJobComponent {
  jobs: Job[] = []; 
  term: string = ""; 
  roleCurrentUser!: string; 
  showLoader: boolean = true;
  constructor(private jobService: JobService, 
    private userService: UserService,
    public utilService: UtilsService) {
      this.roleCurrentUser = this.userService.getStoredUser().role;  
    }

  ngOnInit(): void {
    this.loadJobs();
  }

  loadJobs(): void {
    this.jobService.getAllJobs().subscribe({
      next: (data) => {this.jobs = data; this.showLoader = false;},
      error: (err) => { this.showLoader = false; console.log(err.message)},
    });
  }

  deleteJob(id: number): void {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette offre d'emploi ?")) {
      this.jobService.deleteJob(id).subscribe({
        next: () => {
          this.loadJobs();
        },
        error: (err) => {
          console.error('Erreur:', err);
        },
      });
    }
  }

  
}
