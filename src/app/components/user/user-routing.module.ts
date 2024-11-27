import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; 
import { UpdateUserComponent } from './update-user/update-user.component'; 
import { ListUserComponent } from './list-user-component';

const routes: Routes = [ 
  {path:'edit/:id', component: UpdateUserComponent},
  {path:'', component: ListUserComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
