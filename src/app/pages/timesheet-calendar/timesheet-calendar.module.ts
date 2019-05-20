import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TimesheetCalendarPage } from './timesheet-calendar.page';

import { NgCalendarModule  } from 'ionic2-calendar';

const routes: Routes = [
  {
    path: '',
    component: TimesheetCalendarPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    NgCalendarModule
  ],
  declarations: [TimesheetCalendarPage]
})
export class TimesheetCalendarPageModule {}
