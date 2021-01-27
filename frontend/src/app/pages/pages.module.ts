import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';

//PRIMENG MODULOS
import { ProgressBarModule } from 'primeng/progressbar';

@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    PagesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    ProgressBarModule
  ],
  exports: [
    DashboardComponent,
    ProgressComponent,
    PagesComponent
  ],
})
export class PagesModule {}
