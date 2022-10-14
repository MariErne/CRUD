import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomeComponent } from './home.component';
import { DialogComponent } from './product/dialog/dialog.component';
import { HomeRoutingModule } from './home-routing.module';
import { CreatePatientComponent } from './patient/create-patient/create-patient.component';

@NgModule({
  declarations: [HomeComponent, DialogComponent, CreatePatientComponent],
  imports: [CommonModule, SharedModule, HomeRoutingModule],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeModule {}
