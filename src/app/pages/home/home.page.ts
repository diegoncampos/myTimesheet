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

  data:any;
  weekNumber: number;
  beginningOfWeek:any;
  endOfWeek:any;

  constructor(
    public modalController: ModalController,
    private activateRoute: ActivatedRoute,
    private dataService: DataService,
    ) {

    this.weekNumber = moment(new Date()).week();
    this.beginningOfWeek = moment().week(this.weekNumber).startOf('week').format('DD/MM/YYYY');
    this.endOfWeek = moment().week(this.weekNumber).startOf('week').add(6, 'days').format('DD/MM/YYYY');

    this.data =
      [
        {
          "year": 2019,
          "week": [
            {
              "number": 22,
              "times": [
                { startDate: "2019-03-01T18:00:01.613+12:00", startTime: "2019-04-15T08:00:01.613+12:00", endDate: "2019-04-15T18:00:01.613+12:00", endTime: "2019-04-15T18:00:01.613+12:00", note: "Esto es una nota", open: false },
                { startDate: "2019-03-02T18:00:01.613+12:00", startTime: "2019-04-15T08:15:01.613+12:00", endDate: "2019-04-15T18:00:01.613+12:00", endTime: "2019-04-15T18:15:01.613+12:00", note: "Este dia no trabaje nada!!", open: false },
                { startDate: "2019-03-03T18:00:01.613+12:00", startTime: "2019-04-15T08:30:01.613+12:00", endDate: "2019-04-15T18:00:01.613+12:00", endTime: "2019-04-15T19:58:01.613+12:00", note: "Berni se la come doblada!!", open: false }
              ]
            },
            {
              "number": 23,
              "times": [
                { startDate: "2019-04-01T18:00:01.613+12:00", startTime: "2019-04-15T08:00:01.613+12:00", endDate: "2019-04-15T18:00:01.613+12:00", endTime: "2019-04-15T18:00:01.613+12:00", note: "Esto es una nota", open: false },
                { startDate: "2019-04-02T18:00:01.613+12:00", startTime: "2019-04-15T08:15:01.613+12:00", endDate: "2019-04-15T18:00:01.613+12:00", endTime: "2019-04-15T18:15:01.613+12:00", note: "Este dia no trabaje nada!!", open: false },
                { startDate: "2019-04-03T18:00:01.613+12:00", startTime: "2019-04-15T08:30:01.613+12:00", endDate: "2019-04-15T18:00:01.613+12:00", endTime: "2019-04-15T19:58:01.613+12:00", note: "Berni se la come doblada!!", open: false }
              ]
            },
            {
              "number": 24,
              "times": [
                { startDate: "2019-05-01T18:00:01.613+12:00", startTime: "2019-04-15T08:00:01.613+12:00", endDate: "2019-04-15T18:00:01.613+12:00", endTime: "2019-04-15T18:00:01.613+12:00", note: "Esto es una nota", open: false },
                { startDate: "2019-05-05T18:00:01.613+12:00", startTime: "2019-04-15T08:15:01.613+12:00", endDate: "2019-04-15T18:00:01.613+12:00", endTime: "2019-04-15T18:15:01.613+12:00", note: "Este dia no trabaje nada!!", open: false },
                { startDate: "2019-05-07T18:00:01.613+12:00", startTime: "2019-04-15T08:30:01.613+12:00", endDate: "2019-04-15T18:00:01.613+12:00", endTime: "2019-04-15T19:58:01.613+12:00", note: "Berni se la come doblada!!", open: false }
              ]
            }
          ]
        }
      ]

    this.loadWeek(this.weekNumber);

   }

  ngOnInit() {
    this.receivedId = this.activateRoute.snapshot.paramMap.get('taskId');
    this.taskName = this.activateRoute.snapshot.paramMap.get('taskName');
  }

  ionViewWillEnter() {  // each time you enter to tab call ionViewWillEnter()
    // this.getDataBase();
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
    // let today = this.times.find(o => moment(o.startDate).format("YYYY-MM-DD") === moment(new Date()).format("YYYY-MM-DD"));
    // if (!today) {
    //   this.times.push(
    //     {
    //       startDate: new Date().toISOString(),
    //       startTime: new Date().toISOString(),
    //       endTime: '',
    //       note: ''
    //     }
    //   )
    //   this.playSelected = true;
    // }
    let weeknumber = moment(new Date()).week();
    console.log("week:",weeknumber);
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

  goToLastWeek() {
    this.weekNumber = this.weekNumber - 1;
    this.beginningOfWeek = moment().week(this.weekNumber).startOf('week').format('DD/MM/YYYY');
    this.endOfWeek = moment().week(this.weekNumber).startOf('week').add(6, 'days').format('DD/MM/YYYY');
    this.loadWeek(this.weekNumber)
    console.log("Week:", this.weekNumber);
  }

  goToNextWeek() {
    this.weekNumber = this.weekNumber + 1;
    this.beginningOfWeek = moment().week(this.weekNumber).startOf('week').format('DD/MM/YYYY');
    this.endOfWeek = moment().week(this.weekNumber).startOf('week').add(6, 'days').format('DD/MM/YYYY');
    this.loadWeek(this.weekNumber)
    console.log("Week:", this.weekNumber);
  }

  loadWeek(weekNumber){
    let res;
    let weeks;
    weeks = this.data.filter(x => x.year == '2019')[0].week;
    res = weeks.filter(x => x.number == weekNumber)[0];
    this.times = res && res.times ? res.times : [];
  }

  swipe(event) {
    if(event.direction == 2){
      console.log("Swipe Left")
      this.goToNextWeek();
    }
    else if(event.direction == 4){
      console.log("Swipe Right")
      this.goToLastWeek();
    }
  }

}
