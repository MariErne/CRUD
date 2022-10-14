import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgxsModule } from '@ngxs/store';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { PatientState } from './features/home/patient/patient.state';
import { ApiService } from './core/services/api.service';
import { ProductState } from './features/home/product/product.state';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    CoreModule,
    NgxsModule.forRoot([PatientState, ProductState], { developmentMode: !environment.production }),
  ],
  providers: [ApiService],
  bootstrap: [AppComponent],
})
export class AppModule {}
