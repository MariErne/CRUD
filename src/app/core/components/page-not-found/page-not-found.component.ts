import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-found',
  template: ' <h1 class="mat-text-align-center mat-my-5">{{ "Error 404: Page not found!" }}</h1> ',
  styleUrls: [],
})
export class NotFoundComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
