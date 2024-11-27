import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NiveauExperiences, RemoteWorking, TypeCompany, TypeOfContract } from 'src/app/enum/enums'; 
import { Sector } from 'src/app/models/sector';
import { JobService } from 'src/app/services/job.service';
import { SectorService } from 'src/app/services/sector.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-update-job',
  templateUrl: './update-job.component.html',
  styleUrls: ['./update-job.component.scss']
})
export class UpdateJobComponent {
  sectors: Sector[] = []; 
  jobForm: FormGroup;
  minStartDate: string;
  niveauExperiences = NiveauExperiences;
  remoteWorkingOptions = RemoteWorking;
  typeCompanyOptions = TypeCompany;
  typeOfContractOptions = TypeOfContract;
  jobId!: number; 
  constructor(private jobService: JobService, 
    private router: Router, 
    private sectorService: SectorService,
    public utilService: UtilsService, 
    private activateRoute: ActivatedRoute
  ) {
    const today = new Date();
    const minDate = new Date(today.setDate(today.getDate() + 10));
    this.minStartDate = minDate.toISOString().split('T')[0];
    this.jobId =  parseInt(this.activateRoute.snapshot.paramMap.get('id')!); 
    this.loadJobDetails();
    this.loadSectors();
    this.jobForm = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      jobDescription: new FormControl('', [Validators.required, Validators.minLength(10)]),
      typeOfContract: new FormControl('', Validators.required),
      remoteWorking: new FormControl('', Validators.required),
      profileRequired: new FormControl('', Validators.required),
      skillsExpertise: new FormControl('', Validators.required),
      experiences: new FormControl('', Validators.required),
      typeCompany: new FormControl('', Validators.required),
      sectorId: new FormControl(null, Validators.required), 
      languages: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      state: new FormControl({ value: 'ACTIVE', disabled: true }),
      estimatedStartDate: new FormControl('', Validators.required),
    });
  }

  saveJob(): void {    
    this.jobService.updateJob(this.jobId, this.jobForm.getRawValue()).subscribe({
      next: (data) => { 
        this.router.navigate(['/job'])
      },
      error: (err) => console.log(err.message),
    });
  }

  loadJobDetails(): void{
    this.jobService.getJobById(this.jobId).subscribe({
      next: (data) => {
        this.jobForm.patchValue({
          title: data.title,
          jobDescription: data.jobDescription,
          typeOfContract: data.typeOfContract,
          remoteWorking: data.remoteWorking,
          profileRequired: data.profileRequired,
          skillsExpertise: data.skillsExpertise,
          experiences: data.experiences,
          typeCompany: data.typeCompany,
          sectorId: data.sectorId, 
          languages: data.languages,
          city: data.city, 
          estimatedStartDate : data.estimatedStartDate
        })
      },
      error: (err) => (console.log(err.message)),
    });
  }

  loadSectors(): void {
    this.sectorService.getAllSectors().subscribe({
      next: (data) => {this.sectors = data},
      error: (err) => (console.log(err.message)),
    });
  } 
 
}
