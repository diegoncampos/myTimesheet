import { Component, OnInit } from '@angular/core';
import { Times } from '../../models/times.model';
import { ModalController } from '@ionic/angular';

import { AddTimeModalComponent } from '../../components/add-time-modal/add-time-modal.component';
import { OverlayEventDetail } from '@ionic/core';

import { myEnterAnimation } from '../../animations/enter';
import { myLeaveAnimation } from '../../animations/leave';

import * as moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  times:Times[] = [];//{date:"", startTime: "", endTime:"", note: "", task: ""};
  playSelected:boolean = false;

  constructor(public modalController: ModalController) {
    this.times = [
      {date:"01/01/2019", startTime: "2019-04-15T08:00:01.613+12:00", endTime:"2019-04-15T18:00:01.613+12:00", note: "Esto es una nota", task: "box maker", open: false, earned: "25"},
      {date:"02/02/2019", startTime: "2019-04-15T08:15:01.613+12:00", endTime:"2019-04-15T18:15:01.613+12:00", note: "Este dia no trabaje nada!!", task: "box maker", open: false, earned: "10"},
      {date:"03/03/2019", startTime: "2019-04-15T08:30:01.613+12:00", endTime:"2019-04-15T19:58:01.613+12:00", note: "Berni se la come doblada!!", task: "box maker", open: false, earned: "100"}
    ]

   }

  ngOnInit() {
  }

  async openModal() {
    const modal: HTMLIonModalElement =
      await this.modalController.create({
        component: AddTimeModalComponent,
        componentProps: {
          "paramID": 123,
          "paramTitle": "Test Title"
        },
        enterAnimation: myEnterAnimation,
        leaveAnimation: myLeaveAnimation
      });

    modal.onDidDismiss().then((detail: OverlayEventDetail) => {
      if (detail !== null) {
        console.log('The result:', detail.data);
        this.times.push(detail.data)
      }
    });

    return await modal.present();
  }

  playTime() {
    // If current date is on the list cant add again
    let today = this.times.find(o => moment(o.date).format("YYYY-MM-DD") === moment(new Date()).format("YYYY-MM-DD"));
    if (!today) {
      this.times.push(
        {
          date: new Date().toISOString(),
          startTime: new Date().toISOString(),
          endTime: '',
          note: '',
          task: 'box maker'
        }
      )
      this.playSelected = true;
    }
  }

}
