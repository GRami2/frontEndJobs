import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobRoutingModule } from './job-routing.module';
import { CreateJobComponent } from './create-job/create-job.component';
import { UpdateJobComponent } from './update-job/update-job.component';
import { ListJobComponent } from './list-job.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgPipesModule } from 'ngx-pipes';
import { DetailsJobComponent } from './details-job/details-job.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


@NgModule({
  declarations: [
    CreateJobComponent,
    UpdateJobComponent, 
    ListJobComponent, DetailsJobComponent
  ],
  imports: [
    CommonModule,
    JobRoutingModule, 
    FormsModule,
    ReactiveFormsModule,
    NgPipesModule,
    Ng2SearchPipeModule
  ]
})
export class JobModule { }
