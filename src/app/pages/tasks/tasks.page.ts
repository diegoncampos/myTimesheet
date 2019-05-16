import { Component, OnInit } from '@angular/core'
import { ModalController } from '@ionic/angular';

import { Task } from '../../models/task.model';

import { TaskCreatorComponent } from '../../components/task-creator/task-creator.component';
import { myEnterAnimation } from '../../animations/enter';
import { myLeaveAnimation } from '../../animations/leave';
import { OverlayEventDetail } from '@ionic/core';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
})
export class TasksPage implements OnInit {

  public tasks:Task[] = [];

  constructor(public modalController: ModalController) { }

  ngOnInit() {
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
    });

    return await modal.present();

  }

  onTaskSelected(index) {
    console.log("Seleciono:", this.tasks[index].name)
  }

  delTask(index) {
    console.log("Borrada tarea:", this.tasks[index].name)
    this.tasks.splice(index, 1);
  }

  editTask(index) {
    console.log("Editar tarea:", this.tasks[index].name)
  }

}
