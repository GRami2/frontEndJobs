import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateJobComponent } from './create-job/create-job.component';
import { UpdateJobComponent } from './update-job/update-job.component';
import { ListJobComponent } from './list-job.component';
import { DetailsJobComponent } from './details-job/details-job.component';

const routes: Routes = [
  {path:'create', component: CreateJobComponent},
  {path:'update/:id', component: UpdateJobComponent},
  {path:'show/:id', component: DetailsJobComponent},
  {path:'', component: ListJobComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobRoutingModule { }
