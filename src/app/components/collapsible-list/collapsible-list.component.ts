import { Component, OnInit, Input } from '@angular/core';
import { Times } from '../../models/times.model';

@Component({
  selector: 'app-collapsible-list',
  templateUrl: './collapsible-list.component.html',
  styleUrls: ['./collapsible-list.component.scss'],
})
export class CollapsibleListComponent implements OnInit {
  automaticClose:boolean = true;
  private _times:Times[] = [];

  // Input with Setter method
  @Input()
  set times(times: Times[]) {
    this._times = times && times.length > 0? times : [];
  }
  get times() { return this._times; }

  constructor() { }

  ngOnInit() {}

  toggleSection(index) {
    this.times[index].open = !this.times[index].open;
    if (this.automaticClose && this.times[index].open) {
      this.times.filter((item, itemIndex) => itemIndex != index).map(item => item.open = false);
    }

  }

}
