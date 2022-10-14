import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PatientListComponent } from './patient-list/patient-list.component';

const patientRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: PatientListComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(patientRoutes)],
  exports: [RouterModule],
})
export class PatientRoutingModule {}
