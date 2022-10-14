/* eslint-disable no-alert */
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { ToolbarComponent } from 'src/app/core/components/toolbar/toolbar.component';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  @Input() show: boolean;
  @ViewChild(ToolbarComponent) toolbar: ToolbarComponent;

  constructor(private dialog: MatDialog, private apiService: ApiService, private store: Store) {}

  ngOnInit() {
    // eslint-disable-next-line eqeqeq
    if (this.apiService.subsVar == undefined) {
      this.apiService.subsVar = this.apiService.invokeHomeComponentFunction.subscribe(() => {
        this.toggleForm();
      });
    }
  }

  toggleForm() {
    this.show = !this.show;
    // if (this.show) {
    //   this.toolbar.toggleButton = 'Cancel';
    // } else {
    //   this.toolbar.toggleButton = 'Add Patient';
    // }
  }
}
