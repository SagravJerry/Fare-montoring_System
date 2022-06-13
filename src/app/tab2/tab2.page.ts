import { GroupFare } from './../tab1/tab1.page';
import { AfterViewChecked, Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements AfterViewChecked {
  fareGroups: GroupFare[];
  constructor() {
    this.setData();
  }
  ngAfterViewChecked(): void {
    this.setData();
  }

  setData() {
    this.fareGroups = JSON.parse(localStorage.getItem('fares')) || [];
  }
}

export interface Fare {
  to: string;
  from: string;
  fareAt: Date;
  total: number;
}
