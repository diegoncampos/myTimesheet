import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

import { Times } from '../../models/times.model';

@Component({
  selector: 'app-add-time-modal',
  templateUrl: './add-time-modal.component.html',
  styleUrls: ['./add-time-modal.component.scss'],
})
export class AddTimeModalComponent implements OnInit {

  modalTitle:string;
  modelId:number;
  data: Times;
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
    console.log(this.navParams);
    console.table(this.navParams);
    this.modelId = this.navParams.data.paramID;
    this.modalTitle = this.navParams.data.paramTitle;
  }

  async addCloseModal() {
    const onClosedData: any = this.data;
    await this.modalController.dismiss(onClosedData);
  }
  async cancelCloseModal() {
    const onClosedData: any = this.data;
    await this.modalController.dismiss();
  }

}
