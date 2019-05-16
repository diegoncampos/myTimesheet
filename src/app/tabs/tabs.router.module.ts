import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tasks',
        children: [
          {
            path: '',
            loadChildren: '../pages/tasks/tasks.module#TasksPageModule'
          }
        ]
      },
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: '../pages/home/home.module#HomePageModule'
          }
        ]
      },
      {
        path: 'timesheetCalendar',
        children: [
          {
            path: '',
            loadChildren: '../pages/timesheet-calendar/timesheet-calendar.module#TimesheetCalendarPageModule'
          }
        ]
      },
      {
        path: 'aboutMe',
        children: [
          {
            path: '',
            loadChildren: '../pages/about-me/about-me.module#AboutMePageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/tasks',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tasks',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
