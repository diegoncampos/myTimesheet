import { Component, OnInit } from '@angular/core'
import { ModalController, NavController } from '@ionic/angular';

import { Task } from '../../models/task.model';

import { TaskCreatorComponent } from '../../components/task-creator/task-creator.component';
import { myEnterAnimation } from '../../animations/enter';
import { myLeaveAnimation } from '../../animations/leave';
import { OverlayEventDetail } from '@ionic/core';

import { DataService } from '../../services/data.service'

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
})
export class TasksPage implements OnInit {

  public tasks:Task[] = [];

  constructor(
    public modalController: ModalController,
    public dataService: DataService,
    private nav: NavController
    ) { }

  ngOnInit() { }

  ionViewWillEnter() {  // each time you enter to tab call ionViewWillEnter()
    this.checkValue();
  }

  async addTask() {
    const modal: HTMLIonModalElement =
      await this.modalController.create({
        component: TaskCreatorComponent,
        componentProps: {
          "paramID": 123,
          "paramTitle": "Test Title"
        },
        enterAnimation: myEnterAnimation,
        leaveAnimation: myLeaveAnimation
      });

    modal.onDidDismiss().then((detail: OverlayEventDetail) => {
      console.log("ACA TA LA INFO:", detail.data)
      this.tasks.push(detail.data);
      this.setValue();
    });

    return await modal.present();

  }

  onTaskSelected(index) {
    let id = this.tasks[index].id;
    let name = this.tasks[index].name;
    console.log("Seleciono:", this.tasks[index].id)
    this.nav.navigateForward(`tabs/home/${id}/${name}`);
  }

  delTask(index) {
    console.log("Borrada tarea:", this.tasks[index].name)
    this.tasks.splice(index, 1);
    this.setValue();
  }

  editTask(index) {
    console.log("Editar tarea:", this.tasks[index].name)
  }

  setValue() {
    this.dataService.set('tasksList', this.tasks).then((val) => {
      console.log("Set:", val);
    });
  }

  checkValue() {
    this.dataService.get('tasksList').then((val) => {
      if (val) {
        this.tasks = val;
      }
      console.log("Check:", val)
    })
  }

}
