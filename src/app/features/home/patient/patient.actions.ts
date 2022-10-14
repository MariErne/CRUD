/* eslint-disable max-classes-per-file */
import { IPatient } from '../../../core/models/patient.model';

export class GetAllPatientsAction {
  static readonly type = '[Patient] Get All Patients';
}

export class SetPatientsAction {
  static readonly type = '[Patient] Set Patients';

  constructor(public payload: IPatient) {}
}

export class AddPatientAction {
  static readonly type = '[Patient] Add Patient';

  constructor(public payload: IPatient) {}
}

export class UpdatePatientAction {
  static readonly type = '[Patient] Update Patient';

  constructor(public payload: IPatient, public id: number) {}
}

export class DeletePatientAction {
  static readonly type = '[Patient] Delete Patient';

  constructor(public id: number) {}
}

export class SetSelectedPatientAction {
  static readonly type = '[Patient] Set';

  constructor(public payload: IPatient) {}
}
