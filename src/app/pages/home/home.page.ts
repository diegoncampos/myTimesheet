import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

import { AddTimeModalComponent } from '../../components/add-time-modal/add-time-modal.component';
import { OverlayEventDetail } from '@ionic/core';

import { myEnterAnimation } from '../../animations/enter';
import { myLeaveAnimation } from '../../animations/leave';

import * as moment from 'moment';
import { DataService } from '../../services/data.service'

import { Times } from '../../models/times.model';
import { Data } from '../../models/data.model';
import { Week } from '../../models/week.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  receivedId:any = null;
  taskName:any = null;
  times:Times[] = [];
  playSelected:boolean = false;

  data:Data[] = [];
  weekNumber: number;
  beginningOfWeek:any;
  endOfWeek:any;

  constructor(
    public modalController: ModalController,
    private activateRoute: ActivatedRoute,
    private dataService: DataService,
    ) {

    this.weekNumber = moment(new Date()).week();

    // this.data =
    //   [
    //     {
    //       "year": 2019,
    //       "week": [
    //         {
    //           "number": 25,
    //           "times": [
    //             { startDate: "2019-06-20T18:00:01.613+12:00", startTime: "2019-04-15T08:00:01.613+12:00", endDate: "2019-04-15T18:00:01.613+12:00", endTime: "2019-04-15T18:00:01.613+12:00", note: "Esto es una nota", open: false },
    //             { startDate: "2019-06-21T18:00:01.613+12:00", startTime: "2019-04-15T08:15:01.613+12:00", endDate: "2019-04-15T18:00:01.613+12:00", endTime: "2019-04-15T18:15:01.613+12:00", note: "Este dia no trabaje nada!!", open: false },
    //             { startDate: "2019-06-22T18:00:01.613+12:00", startTime: "2019-04-15T08:30:01.613+12:00", endDate: "2019-04-15T18:00:01.613+12:00", endTime: "2019-04-15T19:58:01.613+12:00", note: "Berni se la come doblada!!", open: false }
    //           ]
    //         },
    //         {
    //           "number": 26,
    //           "times": [
    //             { startDate: "2019-06-23T18:00:01.613+12:00", startTime: "2019-04-15T08:00:01.613+12:00", endDate: "2019-04-15T18:00:01.613+12:00", endTime: "2019-04-15T18:00:01.613+12:00", note: "Esto es una nota", open: false },
    //             { startDate: "2019-06-24T18:00:01.613+12:00", startTime: "2019-04-15T08:15:01.613+12:00", endDate: "2019-04-15T18:00:01.613+12:00", endTime: "2019-04-15T18:15:01.613+12:00", note: "Este dia no trabaje nada!!", open: false },
    //             { startDate: "2019-06-25T18:00:01.613+12:00", startTime: "2019-04-15T08:30:01.613+12:00", endDate: "2019-04-15T18:00:01.613+12:00", endTime: "2019-04-15T19:58:01.613+12:00", note: "Berni se la come doblada!!", open: false }
    //           ]
    //         },
    //         {
    //           "number": 27,
    //           "times": [
    //             { startDate: "2019-07-03T18:00:01.613+12:00", startTime: "2019-04-15T08:00:01.613+12:00", endDate: "2019-04-15T18:00:01.613+12:00", endTime: "2019-04-15T18:00:01.613+12:00", note: "Esto es una nota", open: false },
    //             { startDate: "2019-07-02T18:00:01.613+12:00", startTime: "2019-04-15T08:15:01.613+12:00", endDate: "2019-04-15T18:00:01.613+12:00", endTime: "2019-04-15T18:15:01.613+12:00", note: "Este dia no trabaje nada!!", open: false },
    //             { startDate: "2019-07-01T18:00:01.613+12:00", startTime: "2019-04-15T08:30:01.613+12:00", endDate: "2019-04-15T18:00:01.613+12:00", endTime: "2019-04-15T19:58:01.613+12:00", note: "Berni se la come doblada!!", open: false }
    //           ]
    //         }
    //       ]
    //     }
    //   ]


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
        let addedWeekNumber = moment(detail.data.startDate).week();
        console.log('The result:', detail.data);
        if(this.checkWeek(addedWeekNumber)){    //The week number exist, add new time
          let index = this.data[0].week.findIndex(x => x.number == addedWeekNumber);
          this.data[0].week[index].times.push(detail.data)
        }
        else {    //The week number does not exist, create new week and add new time
          this.data[0].week.push({
            "number": addedWeekNumber,
            "times": []
          })
          let index = this.data[0].week.findIndex(x => x.number == addedWeekNumber);
          this.data[0].week[index].times.push(detail.data)
        }
        this.loadWeek(addedWeekNumber);
        // this.updateDataBase();
      }
    });

    return await modal.present();
  }

  checkWeek(weekNumber):boolean {  //Return true if the week number already exist in this.data
    let weeks = this.data.filter(x => x.year == 2019)[0] ? this.data.filter(x => x.year == 2019)[0].week : [];
    let res = weeks.filter(x => x.number == weekNumber)[0] ? true : false;
    return res;
  }

  checkNewDate(addedWeekNumber, date):boolean { // Check if date doesn't exist still in data
    let week = this.data[0].week.find(x => x.number == addedWeekNumber);
    let day = week.times.find(x => moment(x.startDate,"DD-MM-YYYY").isSame(moment(date,"DD-MM-YYYY")));
    return typeof day === "undefined";
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
        // this.times = val;
        this.data = val;
        this.loadWeek(this.weekNumber);
      }
      else {
        let year = parseInt(moment().format('YYYY'));
        this.data[0] = new Data(year, []);
      }
      console.log("Check:", val, this.data)
    })
  }

  updateDataBase() {
    this.dataService.set(this.receivedId, this.data).then((val) => {
      console.log("Set:", val);
    });
  }

  async selectedItemToEdit(index) {
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
    this.loadWeek(this.weekNumber)
  }

  goToNextWeek() {
    this.weekNumber = this.weekNumber + 1;
    this.loadWeek(this.weekNumber)
    console.log("Week:", this.weekNumber);
  }

  loadWeek(weekNumber){
    let res;
    let weeks;
    weeks = this.data.filter(x => x.year == 2019)[0] ? this.data.filter(x => x.year == 2019)[0].week : [];
    res = weeks.filter(x => x.number == weekNumber)[0];
    this.times = res && res.times ? res.times : [];

    this.beginningOfWeek = moment().week(weekNumber).startOf('week').format('DD/MM/YYYY');
    this.endOfWeek = moment().week(weekNumber).startOf('week').add(6, 'days').format('DD/MM/YYYY');
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
