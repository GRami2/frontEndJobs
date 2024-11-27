import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListSectorComponent } from './list-sector.component';

const routes: Routes = [
  {path:'', component: ListSectorComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SectorRoutingModule { }
