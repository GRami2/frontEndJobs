import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SectorRoutingModule } from './sector-routing.module';
import { SaveSectorComponent } from './save-sector/save-sector.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListSectorComponent } from './list-sector.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


@NgModule({
  declarations: [ 
    SaveSectorComponent, 
    ListSectorComponent
  ],
  imports: [
    CommonModule,
    SectorRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    Ng2SearchPipeModule 
  ]
})
export class SectorModule { }
