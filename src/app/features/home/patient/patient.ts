import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { PatientListComponent } from './patient-list/patient-list.component';
import { PatientRoutingModule } from './patient-routing.module';

@NgModule({
  declarations: [PatientListComponent],
  imports: [CommonModule, SharedModule, PatientRoutingModule],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
})
export class PatientModule {}
