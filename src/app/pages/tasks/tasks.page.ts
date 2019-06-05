import { Component, OnInit } from '@angular/core'
import { ModalController, NavController, Platform, AlertController } from '@ionic/angular';

import { Task } from '../../models/task.model';

import { TaskCreatorComponent } from '../../components/task-creator/task-creator.component';
import { myEnterAnimation } from '../../animations/enter';
import { myLeaveAnimation } from '../../animations/leave';
import { OverlayEventDetail } from '@ionic/core';

import { DataService } from '../../services/data.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
})
export class TasksPage implements OnInit {

  public tasks:Task[] = [];
  backButtonSubscription:any;

  constructor(
    public modalController: ModalController,
    public dataService: DataService,
    private nav: NavController,
    private platform: Platform,
    private alertController : AlertController,
    private router: Router
    ) { }

  ngOnInit() { }

  ngAfterViewInit() {
    this.backButtonSubscription = this.platform.backButton.subscribe(async () => {
      if (this.router.url === '/tabs/tasks') {
        const alert = await this.alertController.create({
          header: 'Exit app?',
          buttons: [
            {
              text: 'Cancel',
              cssClass: 'secondary'
            }, {
              text: 'Exit',
              handler: () => {
                navigator['app'].exitApp();
              }
            }
          ]
        });
        await alert.present();
      }
      else {
        this.router.navigate(['/tabs/tasks'])
      }
    });
  }

  ngOnDestroy() {
    this.backButtonSubscription.unsubscribe();
  }

  ionViewWillEnter() {  // each time you enter to tab call ionViewWillEnter()
    this.getDataBase();
  }

  async addTask() {
    const modal: HTMLIonModalElement =
      await this.modalController.create({
        component: TaskCreatorComponent,
        componentProps: {
          "title": "Add Task"
        },
        enterAnimation: myEnterAnimation,
        leaveAnimation: myLeaveAnimation
      });

    modal.onDidDismiss().then((detail: OverlayEventDetail) => {
      if(detail.data){
        this.tasks.push(detail.data);
        this.updateDataBase();
      }
    });
    return await modal.present();
  }

  async editTask(index) {
    const modal: HTMLIonModalElement =
      await this.modalController.create({
        component: TaskCreatorComponent,
        componentProps: {
          "title": "Edit Task",
          "item": this.tasks[index]
        },
        enterAnimation: myEnterAnimation,
        leaveAnimation: myLeaveAnimation
      });

    modal.onDidDismiss().then((detail: OverlayEventDetail) => {
      if (detail !== null && detail.data) {
        this.tasks[index]  = detail.data;
        this.updateDataBase();
      }
    });
    return await modal.present();
  }

  onTaskSelected(index) {
    let id = this.tasks[index].id;
    let name = this.tasks[index].name;
    this.nav.navigateForward(`tabs/home/${id}/${name}`);
  }

  delTask(index) {
    console.log("Borrada tarea:", this.tasks[index].name)
    let id = this.tasks[index].id;
    this.dataService.remove(id).then((val) => {
      console.log("Removed");
    });
    this.tasks.splice(index, 1);
    this.updateDataBase();
  }

  updateDataBase() {
    this.dataService.set('tasksList', this.tasks).then((val) => {
      console.log("Set:", val);
    });
  }

  getDataBase() {
    this.dataService.get('tasksList').then((val) => {
      if (val) {
        this.tasks = val;
      }
      console.log("Check:", val)
    })
  }

}
