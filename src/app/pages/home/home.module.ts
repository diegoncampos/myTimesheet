import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HomePage } from './home.page';
import { CollapsibleListComponent } from '../../components/collapsible-list/collapsible-list.component';
import { AddTimeModalComponent } from '../../components/add-time-modal/add-time-modal.component';

const routes: Routes = [
  {
    path: '',
    component: HomePage
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
    HomePage,
    CollapsibleListComponent,
    AddTimeModalComponent
  ],
  entryComponents: [
    AddTimeModalComponent
  ]
})
export class HomePageModule {}
