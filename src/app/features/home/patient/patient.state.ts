/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable class-methods-use-this */
import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs';
import { IPatient } from '../../../core/models/patient.model';
import { ApiService } from '../../../core/services/api.service';
import {
  AddPatientAction,
  DeletePatientAction,
  GetAllPatientsAction,
  SetSelectedPatientAction,
  UpdatePatientAction,
} from './patient.actions';

export interface IPatientStateModel {
  patients: IPatient[];
  selectedPatient: IPatient;
}
@State<IPatientStateModel>({
  name: 'patientList',
  defaults: {
    patients: [],
    selectedPatient: null,
  },
})
@Injectable()
export class PatientState {
  constructor(private apiService: ApiService) {}

  @Selector()
  static getPatientsList(state: IPatientStateModel) {
    return state.patients;
  }

  @Selector()
  static getSelectedPatient(state: IPatientStateModel) {
    return state.selectedPatient;
  }
  @Action(AddPatientAction)
  addPatient(
    { getState, patchState }: StateContext<IPatientStateModel>,
    { payload }: AddPatientAction,
  ) {
    return this.apiService.createPatient(payload).pipe(
      tap((result) => {
        const state = getState();
        patchState({
          patients: [...state.patients, result],
        });
      }),
    );
  }
  @Action(GetAllPatientsAction)
  getAllPatients({ getState, setState }: StateContext<IPatientStateModel>) {
    return this.apiService.getAllPatients().pipe(
      tap((result) => {
        const state = getState();
        setState({
          ...state,
          patients: result,
        });
      }),
    );
  }
  @Action(DeletePatientAction)
  deletePatient(
    { getState, setState }: StateContext<IPatientStateModel>,
    { id }: DeletePatientAction,
  ) {
    return this.apiService.deletePatient(id).pipe(
      tap((result) => {
        const state = getState();
        const filteredArray = state.patients.filter((item) => item.id !== id);
        setState({
          ...state,
          patients: filteredArray,
        });
      }),
    );
  }
  @Action(UpdatePatientAction)
  updatePatient(
    { getState, setState }: StateContext<IPatientStateModel>,
    { payload, id }: UpdatePatientAction,
  ) {
    return this.apiService.updatePatient(payload, id).pipe(
      tap((result) => {
        const state = getState();
        const patientsList = [...state.patients];
        const patientIndex = patientsList.findIndex((item) => item.id === id);
        patientsList[patientIndex] = result;
        setState({
          ...state,
          patients: patientsList,
        });
      }),
    );
  }

  @Action(SetSelectedPatientAction)
  setSelectedPatient(
    { getState, setState }: StateContext<IPatientStateModel>,
    { payload }: SetSelectedPatientAction,
  ) {
    const state = getState();
    setState({
      ...state,
      selectedPatient: payload,
    });
  }
}
