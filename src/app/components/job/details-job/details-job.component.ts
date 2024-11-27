import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { JobService } from 'src/app/services/job.service';
import { SectorService } from 'src/app/services/sector.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-details-job',
  templateUrl: './details-job.component.html',
  styleUrls: ['./details-job.component.scss']
})
export class DetailsJobComponent {
  jobId!: number;
  jobDetails!: any;
  showLoader: boolean = true; 

  constructor(private jobService: JobService, 
    private sectorService: SectorService,
    private activavteRoute: ActivatedRoute, 
    public utilService: UtilsService,
  ){
    this.jobId = parseInt(this.activavteRoute.snapshot.paramMap.get('id')!);
    this.loadJobDetails();
  }
 
  loadJobDetails(){
    this.jobService.getJobById(this.jobId).subscribe((job) => {
      forkJoin({
        job: this.jobService.getJobById(this.jobId),
        sector: this.sectorService.getSectorById(job.sectorId)
      }).subscribe(({ job, sector }) => {
        this.jobDetails = {
          ...job,
          sectorDetails: sector
        };
        this.showLoader = false;  
      }, error =>{this.showLoader = false; });
    });
  }
} 
