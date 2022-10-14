import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MoreComponent } from './more.component';

const moreRoutes: Routes = [
  {
    path: '',
    component: MoreComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(moreRoutes)],
  exports: [RouterModule],
})
export class MoreRoutingModule {}
