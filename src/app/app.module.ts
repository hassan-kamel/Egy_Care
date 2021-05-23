import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule}  from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LogInComponent } from './log-in/log-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HomePageComponent } from './home-page/home-page.component';
import { HttpClientModule }  from '@angular/common/http';
import { AdminComponent } from './admin/admin.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { PatientComponent } from './patient/patient.component';
import { MedicinesComponent } from './medicines/medicines.component';
import { DiseasesComponent } from './diseases/diseases.component';
import { OperationsComponent } from './operations/operations.component';
import { SensitivitiesComponent } from './sensitivities/sensitivities.component';
import { TestsComponent } from './tests/tests.component';
import { PersonalComponent } from './personal/personal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import {MatDatepickerModule} from '@angular/material/datepicker';
// import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    LogInComponent,
    SignUpComponent,
    HomePageComponent,
    AdminComponent,
    PatientComponent,
    MedicinesComponent,
    DiseasesComponent,
    OperationsComponent,
    SensitivitiesComponent,
    TestsComponent,
    PersonalComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
