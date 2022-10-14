/* eslint-disable eqeqeq */
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { HomeComponent } from 'src/app/features/home/home.component';
import { DialogComponent } from 'src/app/features/home/product/dialog/dialog.component';
import { GetAllProductsAction } from 'src/app/features/home/product/product.actions';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit, AfterViewInit {
  @ViewChild(DialogComponent) dialogComp: DialogComponent;
  @ViewChild(HomeComponent) homeElement: HomeComponent;
  show: boolean;
  toggleButton: string = 'Add Patient';

  @ViewChild('createPatient') createPatient: ElementRef;

  constructor(
    private dialog: MatDialog,
    private apiService: ApiService,
    private store: Store,
    private router: Router,
  ) {}

  ngOnInit(): void {
    // this.show = this.homeElement.show;
  }
  ngAfterViewInit() {
    console.log(this.homeElement);
    console.log(this.createPatient.nativeElement);
  }

  toggleForm() {
    this.apiService.onAddPatientButtonClick();

    // this.show = this.homeElement.show;
    // if (this.show) {
    //   this.toggleButton = 'Cancel adding Patient';
    // } else this.toggleButton = 'Add Patient';
  }

  openDialog() {
    this.dialog
      .open(DialogComponent, {
        width: '30%',
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'save') {
          this.store.dispatch(new GetAllProductsAction());
        }
      });
  }
  hasRoute(route: string) {
    return !this.router.url.includes(route);
  }
}
