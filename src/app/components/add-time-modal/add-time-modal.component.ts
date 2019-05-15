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
      date: new Date().toISOString(),
      startTime: new Date().toISOString(),
      endTime: '',
      note: '',
      task: 'box maker'
    };
  }

  ngOnInit() {
    console.log(this.navParams);
    console.table(this.navParams);
    this.modelId = this.navParams.data.paramID;
    this.modalTitle = this.navParams.data.paramTitle;
  }

  async closeModal() {
    const onClosedData: any = this.data;
    await this.modalController.dismiss(onClosedData);
  }

}
