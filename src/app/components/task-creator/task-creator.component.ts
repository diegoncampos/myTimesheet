import { Component, OnInit } from '@angular/core';

import { Task } from '../../models/task.model';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-task-creator',
  templateUrl: './task-creator.component.html',
  styleUrls: ['./task-creator.component.scss'],
})
export class TaskCreatorComponent implements OnInit {

  public task:Task = {name: '', hourlyRate: null, weekStartDay: null, taxPercentage: null, specialDay: false, specialDayPercentage: null};
  public days = [
    {name: 'Monday', value:0},
    {name: 'Tuesday', value:1},
    {name: 'Wednesday', value:2},
    {name: 'Thursday', value:3},
    {name: 'Friday', value:4},
    {name: 'Saturday', value:5},
    {name: 'Sunday', value:6}
  ];

  constructor(private modalController: ModalController) { }

  ngOnInit() {}

  async closeModal() {
    const onClosedData: any = this.task;
    await this.modalController.dismiss(onClosedData);
  }

}
