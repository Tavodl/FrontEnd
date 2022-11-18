import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Dashboard2Component } from './dashboard2.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    Dashboard2Component
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: Dashboard2Component,
      },
    ]),
  ]
})
export class Dashboard2Module { }
