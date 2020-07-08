import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule, MatButtonModule, MatSidenavModule, MatCheckboxModule, MatPaginatorModule, MatDialogModule, MatDividerModule, MatFormFieldModule, MatGridListModule, MatIconModule, MatInputModule,MatMenuModule,MatProgressBarModule, MatStepperModule,MatTableModule,MatTabsModule, MatToolbarModule, MatTooltipModule } from '@angular/material';
import {MatListModule} from '@angular/material/list';






/* Components */
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { EnrollComponent } from './enroll/enroll.component';
import { HomeComponent } from './home/home.component';
import { RetailerComponent } from './retailer/retailer.component';
import { UserManagementComponent } from './user-management/user-management.component';



/* Partial Components */
import { DashboardComponent } from './_partials/dashboard/dashboard.component';
import { StatisticsComponent } from './_partials/statistics/statistics.component';
import { CreateStationComponent } from './_partials/create-station/create-station.component';
import { CreateActivityComponent } from './_partials/create-activity/create-activity.component';
import { QualitycheckComponent } from './_partials/qualitycheck/qualitycheck.component';

/* Services */
import { ApiService, AuthService, UserService } from './_services/index';
import { AuthGuard } from './_guards/auth.guard';
import { CreateAssetComponent } from './_partials/create-asset/create-asset.component';
import { QualitymanagementComponent } from './qualitymanagement/qualitymanagement.component';
import { EmployeeComponent } from './employee/employee.component';
import { ProcurementComponent } from './procurement/procurement.component';
import { CustomerComponent } from './customer/customer.component';
import { SupervisorComponent } from './supervisor/supervisor.component';






@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    EnrollComponent,
    RetailerComponent,
    UserManagementComponent,
    DashboardComponent,
    CreateStationComponent,
    CreateAssetComponent,
    CreateActivityComponent,
    StatisticsComponent,
    QualitymanagementComponent,
    EmployeeComponent,
    ProcurementComponent,
    CustomerComponent,
    SupervisorComponent,
    QualitycheckComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatTabsModule,
    MatTableModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatSidenavModule,
    MatListModule,
    MatSelectModule
  ],
  providers: [
    ApiService,
    AuthService,
    UserService,
    AuthGuard
  ],
  bootstrap: [AppComponent],
  entryComponents: [
  ]
})
export class AppModule { }
