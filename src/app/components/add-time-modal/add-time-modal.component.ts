import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

import { Times } from '../../models/times.model';

@Component({
  selector: 'app-add-time-modal',
  templateUrl: './add-time-modal.component.html',
  styleUrls: ['./add-time-modal.component.scss'],
})
export class AddTimeModalComponent implements OnInit {

  // modalTitle:string;
  // modelId:number;
  data: Times;
  tittle: string;
  editMode: boolean = false;
  // date: String = new Date().toISOString();
  // startTime: String = new Date().toISOString();
  // finishTime: String;

  constructor(private modalController: ModalController, private navParams: NavParams) {
    this.data = {
      startDate: new Date().toISOString(),
      startTime: new Date().toISOString(),
      endDate: '',
      endTime: '',
      note: ''
    };
  }

  ngOnInit() {
    this.tittle = this.navParams.data.tittle;
    if(this.navParams.data.item){
      this.editMode = true;
      this.data = this.navParams.data.item;
    }
  }

  async addCloseModal() {
    const onClosedData: any = this.data;
    await this.modalController.dismiss(onClosedData);
  }

  async cancelCloseModal() {
    await this.modalController.dismiss();
  }

}
