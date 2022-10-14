import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { MoreComponent } from './more.component';
import { MoreRoutingModule } from './more-routing.module';

@NgModule({
  declarations: [MoreComponent],
  imports: [CommonModule, SharedModule, MoreRoutingModule],
})
export class MoreModule {}
