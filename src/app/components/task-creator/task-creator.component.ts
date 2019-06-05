import { Component, OnInit } from '@angular/core';

import { Task } from '../../models/task.model';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-task-creator',
  templateUrl: './task-creator.component.html',
  styleUrls: ['./task-creator.component.scss'],
})
export class TaskCreatorComponent implements OnInit {

  title: string;
  editMode: boolean = false;
  public task:Task = {name: '', id: null, hourlyRate: null, weekStartDay: null, taxPercentage: null, specialDay: false, specialDayPercentage: null};
  public days = [
    {name: 'Monday', value:0},
    {name: 'Tuesday', value:1},
    {name: 'Wednesday', value:2},
    {name: 'Thursday', value:3},
    {name: 'Friday', value:4},
    {name: 'Saturday', value:5},
    {name: 'Sunday', value:6}
  ];

  constructor(private modalController: ModalController, private navParams: NavParams) { }

  ngOnInit() {
    this.title = this.navParams.data.title;
    if(this.navParams.data.item){
      this.editMode = true;
      this.task = this.navParams.data.item;
    }
  }

  async addCloseModal() {
    this.task['id'] = this.task.name.replace(/ /g, "");
    const onClosedData: any = this.task;
    await this.modalController.dismiss(onClosedData);
  }

  async cancelCloseModal() {
    await this.modalController.dismiss();
  }

}
