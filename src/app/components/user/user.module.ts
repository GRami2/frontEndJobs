import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';  
import { UpdateUserComponent } from './update-user/update-user.component';  
import { ListUserComponent } from './list-user-component';  
import { AvatarTitlePipe } from './pipes/avatar-title.pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ 
    UpdateUserComponent,
    ListUserComponent, 
    AvatarTitlePipe, 
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    Ng2SearchPipeModule,
    FormsModule
  ]
})
export class UserModule { }
