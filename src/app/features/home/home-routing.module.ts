import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';

const homeRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('src/app/features/home/patient/patient').then((m) => m.PatientModule),
        outlet: 'patient',
      },
      {
        path: '',
        loadChildren: () =>
          import('src/app/features/home/product/product.module').then((m) => m.ProductModule),
        outlet: 'product',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(homeRoutes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
