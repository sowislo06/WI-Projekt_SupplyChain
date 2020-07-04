import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { EnrollComponent } from './enroll/enroll.component';
import { RetailerComponent } from './retailer/retailer.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { QualitymanagementComponent } from './qualitymanagement/qualitymanagement.component';


import { AuthGuard } from './_guards/auth.guard';

/*
*
* Qualitätssicherung, Mitarbeiter, Einkauf, Verkauf, Kunde, Leitung
*
*/

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'enroll', component: EnrollComponent },
  // Main Pages

  { path: 'retailer', component: RetailerComponent, canActivate: [AuthGuard] },
  { path: 'users', component: UserManagementComponent, canActivate: [AuthGuard] },
  { path: 'procurement', component: QualitymanagementComponent, canActivate: [AuthGuard] },

  // otherwise redirect to login
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
