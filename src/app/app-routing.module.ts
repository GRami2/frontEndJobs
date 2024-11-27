import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home.component';
import { AuthGuard } from './auth.guard';
import { AnalyticsComponent } from './components/analytics/analytics.component'; 
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [ 
  {path:'login', component: LoginComponent}, 
  {path:'register', component: RegisterComponent},
  {path:'', component: HomeComponent, canActivate: [AuthGuard],
    children:[
      {path:'analytics', component: AnalyticsComponent}, 
      {path:'user', loadChildren: () => import('./components/user/user.module').then( m => m.UserModule) },
      {path:'sector', loadChildren: () => import('./components/sector/sector.module').then( m => m.SectorModule) },
      {path:'job', loadChildren: () => import('./components/job/job.module').then( m => m.JobModule) },
    ]
  },
  {path: '**', component: NotFoundComponent }
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
