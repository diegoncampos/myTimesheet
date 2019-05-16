import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { TaskCreatorComponent } from '../../components/task-creator/task-creator.component';

import { IonicModule } from '@ionic/angular';

import { TasksPage } from './tasks.page';

const routes: Routes = [
  {
    path: '',
    component: TasksPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    TasksPage,
    TaskCreatorComponent
  ],
  entryComponents: [
    TaskCreatorComponent
  ]
})
export class TasksPageModule {}
