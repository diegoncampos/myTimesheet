import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Times } from '../../models/times.model';

@Component({
  selector: 'app-collapsible-list',
  templateUrl: './collapsible-list.component.html',
  styleUrls: ['./collapsible-list.component.scss'],
})
export class CollapsibleListComponent implements OnInit {
  automaticClose:boolean = true;
  private _times:Times[] = [];

  // Input with ngOnChange
  @Input() times: Times[];

  // ngOnChanges(changes: SimpleChanges): void {
    // if(changes['times']) {
    //   console.log("ACAA", changes['times'].currentValue)
    // }
  // }

  constructor() { }

  ngOnInit() {}

  toggleSection(index) {
    this.times[index].open = !this.times[index].open;
    if (this.automaticClose && this.times[index].open) {
      this.times.filter((item, itemIndex) => itemIndex != index).map(item => item.open = false);
    }

  }

}
