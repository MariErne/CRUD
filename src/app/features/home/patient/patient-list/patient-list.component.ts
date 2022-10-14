/* eslint-disable no-alert */
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Select, Store } from '@ngxs/store';
import { Observable, Subject } from 'rxjs';
import { IPatient } from 'src/app/core/models/patient.model';
import { ApiService } from 'src/app/core/services/api.service';
import {
  DeletePatientAction,
  GetAllPatientsAction,
  SetSelectedPatientAction,
} from 'src/app/features/home/patient/patient.actions';
import { PatientState } from 'src/app/features/home/patient/patient.state';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss'],
})
export class PatientListComponent implements OnInit {
  showedColumns: string[] = ['ID', 'firstName', 'lastName', 'gender', 'date', 'comment', 'action'];
  dataSource: MatTableDataSource<any>;
  toggleButton: any = 'Add Patient';
  show: boolean = false;
  private readonly destroy$: Subject<boolean> = new Subject();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Select(PatientState.getPatientsList) patients: Observable<IPatient[]>;

  constructor(private apiService: ApiService, private store: Store) {}

  ngOnInit() {
    this.getAllPatients();
    this.store.dispatch(new GetAllPatientsAction());
  }

  getAllPatients() {
    this.apiService.getAllPatients().subscribe({
      next: (result) => {
        this.dataSource = new MatTableDataSource(result);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: () => {
        alert('Error while fetching the Patients!');
      },
    });
  }

  deletePatient(id: number) {
    console.log('Deleted id: ', id);
    this.store.dispatch(new DeletePatientAction(id));
  }

  updatePatient(payload: IPatient) {
    this.apiService.onAddPatientButtonClick();
    this.store.dispatch(new SetSelectedPatientAction(payload));
  }

  filterPatient($event: Event) {
    const filterValue = ($event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
