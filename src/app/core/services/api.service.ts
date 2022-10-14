import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { IPatient } from '../models/patient.model';
import { IProduct } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  invokeHomeComponentFunction = new EventEmitter();
  subsVar: Subscription;

  constructor(private http: HttpClient) {}

  // PRODUCT
  getAllProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>('http://localhost:3000/productList/');
  }
  addProduct(product: IProduct): Observable<IProduct> {
    return this.http.post<IProduct>('http://localhost:3000/productList/', product);
  }
  updateProduct(product: IProduct, id: number): Observable<any> {
    return this.http.put(`http://localhost:3000/productList/${id}`, product);
  }
  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`http://localhost:3000/productList/${id}`);
  }

  // PATIENT
  getAllPatients(): Observable<IPatient[]> {
    return this.http.get<IPatient[]>('http://localhost:3000/patientList/');
  }
  createPatient(patient: IPatient): Observable<IPatient> {
    return this.http.post<IPatient>('http://localhost:3000/patientList/', patient);
  }
  updatePatient(patient: IPatient, id: number): Observable<any> {
    return this.http.put(`http://localhost:3000/patientList/${id}`, patient);
  }
  deletePatient(id: number): Observable<any> {
    return this.http.delete(`http://localhost:3000/patientList/${id}`);
  }
  onAddPatientButtonClick() {
    this.invokeHomeComponentFunction.emit();
  }
  // get data(): any {
  //   return this.show;
  // }
  // set data(val: boolean) {
  //   this.show = val;
  //   this.invokeHomeComponentFunction.emit(val);
  // }
}
