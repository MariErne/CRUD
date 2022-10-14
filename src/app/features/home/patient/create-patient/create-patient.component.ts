/* eslint-disable no-alert */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable class-methods-use-this */
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable, Subject } from 'rxjs';
import { IPatient } from 'src/app/core/models/patient.model';
import { ApiService } from 'src/app/core/services/api.service';
import {
  AddPatientAction,
  GetAllPatientsAction,
  SetSelectedPatientAction,
  UpdatePatientAction,
} from 'src/app/features/home/patient/patient.actions';
import { PatientState } from 'src/app/features/home/patient/patient.state';

@Component({
  selector: 'app-create-patient',
  templateUrl: './create-patient.component.html',
  styleUrls: ['./create-patient.component.scss'],
})
export class CreatePatientComponent implements OnInit {
  private readonly destroy$: Subject<boolean> = new Subject();
  genderList = ['Female', 'Male', 'Unkonown'];
  editPatient = false;
  actionBtn: string;
  maxDate: string = new Date(new Date().setHours(0, 0, 0, 0)).toISOString();
  patientCreateEditForm: FormGroup;
  @Select(PatientState.getSelectedPatient) selectedPatient: Observable<IPatient>;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private store: Store,
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.selectedPatient.subscribe((patient) => {
      if (patient) {
        this.patientCreateEditForm.patchValue({
          id: patient.id,
          firstName: patient.firstName,
          lastName: patient.lastName,
          gender: patient.gender,
          date: patient.date,
          comment: patient.comment,
        });
        this.editPatient = true;
        this.actionBtn = 'Update';
      } else {
        this.editPatient = false;
        this.actionBtn = 'Save';
      }
    });
  }

  createForm() {
    this.patientCreateEditForm = this.formBuilder.group({
      id: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: ['', null],
      date: ['', null],
      comment: ['', null],
    });
  }

  onSubmit(payload: IPatient) {
    if (this.editPatient) {
      this.store
        .dispatch(
          new UpdatePatientAction(
            this.patientCreateEditForm.value,
            this.patientCreateEditForm.value.id,
          ),
        )
        .subscribe({
          next: (res) => {
            this.clearForm();
            this.closeForm();
            this.store.dispatch(new GetAllPatientsAction());
          },
          error: () => {
            alert('Error while updating the patient!');
          },
        });
    } else if (this.patientCreateEditForm.valid) {
      this.store.dispatch(new AddPatientAction(this.patientCreateEditForm.value)).subscribe({
        next: (res) => {
          this.clearForm();
          this.closeForm();
          this.store.dispatch(new GetAllPatientsAction());
        },
        error: () => {
          alert('Error while adding the patient!');
        },
      });
    }
  }

  closeForm() {
    this.apiService.onAddPatientButtonClick();
  }

  clearForm() {
    this.patientCreateEditForm.reset();
    this.store.dispatch(new SetSelectedPatientAction(null));
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
