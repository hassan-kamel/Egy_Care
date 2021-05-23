import { TestsComponent } from './tests/tests.component';
import { SensitivitiesComponent } from './sensitivities/sensitivities.component';
import { OperationsComponent } from './operations/operations.component';
import { DiseasesComponent } from './diseases/diseases.component';
import { MedicinesComponent } from './medicines/medicines.component';
import { PersonalComponent } from './personal/personal.component';
import { AdminComponent } from './admin/admin.component';
import { HomePageComponent } from './home-page/home-page.component';
import { PatientComponent } from './patient/patient.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LogInComponent } from './log-in/log-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [
  {path:'',redirectTo:'landing',pathMatch:"full"},
  {path:'admin',component:AdminComponent},
  {path:'home',component:HomePageComponent},
  {path:'landing',component:LandingPageComponent},
  {path:'signup',component:SignUpComponent},
  {path:'login',component:LogInComponent},
  {path:'patient/:ssn',component:PatientComponent,
  children:[
    {path:'',redirectTo:'personal',pathMatch:"full"},
    {path:'personal',component:PersonalComponent},
    {path:'medicines',component:MedicinesComponent},
    {path:'diseases',component:DiseasesComponent},
    {path:'operations',component:OperationsComponent},
    {path:'sensitivities',component:SensitivitiesComponent},
    {path:'tests',component:TestsComponent},
    {path:'**',redirectTo:'personal',pathMatch:"full"}
  ]},
  {path:'**',redirectTo:'landing',pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
