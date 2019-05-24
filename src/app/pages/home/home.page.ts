import { Component, OnInit } from '@angular/core';
import { Times } from '../../models/times.model';
import { ModalController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

import { AddTimeModalComponent } from '../../components/add-time-modal/add-time-modal.component';
import { OverlayEventDetail } from '@ionic/core';

import { myEnterAnimation } from '../../animations/enter';
import { myLeaveAnimation } from '../../animations/leave';

import * as moment from 'moment';
import { DataService } from '../../services/data.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  receivedId:any = null;
  taskName:any = null;
  times:Times[] = [];//{date:"", startTime: "", endTime:"", note: "", task: ""};
  isOneWeek: boolean;
  playSelected:boolean = false;

  constructor(
    public modalController: ModalController,
    private activateRoute: ActivatedRoute,
    private dataService: DataService,
    ) {
    // this.times = [
    //   {startDate:"01/01/2019", startTime: "2019-04-15T08:00:01.613+12:00", endDate:"2019-04-15T18:00:01.613+12:00", endTime:"2019-04-15T18:00:01.613+12:00", note: "Esto es una nota", open: false},
    //   {startDate:"02/02/2019", startTime: "2019-04-15T08:15:01.613+12:00", endDate:"2019-04-15T18:00:01.613+12:00", endTime:"2019-04-15T18:15:01.613+12:00", note: "Este dia no trabaje nada!!", open: false},
    //   {startDate:"03/03/2019", startTime: "2019-04-15T08:30:01.613+12:00", endDate:"2019-04-15T18:00:01.613+12:00", endTime:"2019-04-15T19:58:01.613+12:00", note: "Berni se la come doblada!!", open: false}
    // ]

   }

  ngOnInit() {
    this.receivedId = this.activateRoute.snapshot.paramMap.get('taskId');
    this.taskName = this.activateRoute.snapshot.paramMap.get('taskName');
  }

  ionViewWillEnter() {  // each time you enter to tab call ionViewWillEnter()
    this.getDataBase();
  }

  async addModal() {
    const modal: HTMLIonModalElement =
      await this.modalController.create({
        component: AddTimeModalComponent,
        componentProps: {
          "title": "Add Time",
        },
        enterAnimation: myEnterAnimation,
        leaveAnimation: myLeaveAnimation
      });

    modal.onDidDismiss().then((detail: OverlayEventDetail) => {
      if (detail !== null && detail.data) {
        console.log('The result:', detail.data);
        if (!this.isOneWeek) {
          this.times.push(detail.data);
          this.updateDataBase();
          this.isOneWeekCheck();
        }
      }
    });

    return await modal.present();
  }

  playTime() {
    // If current date is on the list cant add again
    let today = this.times.find(o => moment(o.startDate).format("YYYY-MM-DD") === moment(new Date()).format("YYYY-MM-DD"));
    if (!today) {
      this.times.push(
        {
          startDate: new Date().toISOString(),
          startTime: new Date().toISOString(),
          endTime: '',
          note: ''
        }
      )
      this.playSelected = true;
    }
  }

  getDataBase() {
    this.dataService.get(this.receivedId).then((val) => {
      if (val) {
        this.times = val;
        this.isOneWeekCheck();
      }
      console.log("Check:", val)
    })
  }

  updateDataBase() {
    this.dataService.set(this.receivedId, this.times).then((val) => {
      console.log("Set:", val);
    });
  }

  isOneWeekCheck(){
    this.isOneWeek = this.times.length === 7;
  }

  async selectedItemToEdit(index) {
    console.log("ACAAAA", index)
    const modal: HTMLIonModalElement =
      await this.modalController.create({
        component: AddTimeModalComponent,
        componentProps: {
          "title": "Edit Time",
          "item": this.times[index]
        },
        enterAnimation: myEnterAnimation,
        leaveAnimation: myLeaveAnimation
      });

    modal.onDidDismiss().then((detail: OverlayEventDetail) => {
      if (detail !== null && detail.data) {
        this.times[index]  = detail.data;
        this.updateDataBase();
      }
    });

    return await modal.present();
  }

}
