import { Component } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Fare } from '../tab2/tab2.page';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  from: Location = null;
  to: Location = null;
  locations: Location[] = [
    {
      display: 'Carigara Terminal',
      mark: 10,
    },
    {
      display: 'J & F',
      mark: 8,
    },
    {
      display: 'Carigara Hospital',
      mark: 5,
    },
    {
      display: 'Evsu',
      mark: 4,
    },
    {
      display: 'Sunod Minuswang',
      mark: 3,
    },
    {
      display: 'Minuswang',
      mark: 2,
    },
    {
      display: 'Barugo Terminal',
      mark: 1,
    },
  ];

  constructor(public loadingCtrl: LoadingController) {}

  get fare(): number {
    if (this.to && this.from) {
      const dif = Math.abs(this.from.mark - this.to.mark);
      if (dif <= 5) {
        return 10;
      }

      return (dif - 5) * 4 + 14;
    }
    return 0;
  }
  c() {
    console.log(this.from, this.to);
  }
  async presentLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Printing reciept...',
      duration: 2000
    });
    await loading.present();
  }

  print() {
    const now = new Date();
    const fare: Fare = {
      to: this.to.display,
      from: this.from.display,
      fareAt: now,
      total: this.fare,
    };
    const fareDate = now.toLocaleDateString();
    const fareObj: GroupFare = {
      key: fareDate,
      values: [fare],
      createdAt: now,
      total: fare.total
    };
    const fares: GroupFare[] = JSON.parse(localStorage.getItem('fares')) || [];
    let hasEntry = false;

    fares.forEach(fg => {
      if(fg.key === fareDate) {
        fg.values.push(fare);
        fg.total += fare.total;
        hasEntry = true;
      }
    });

    if (!hasEntry) {
      fares.push(fareObj);
    }

    localStorage.setItem('fares', JSON.stringify(fares));
    this.reset();
    this.presentLoading();
  }
  compareWith(o1: Location, o2: Location) {
    return o1 && o2 ? o1.mark === o2.mark : o1 === o2;
  }

  reset() {
    this.to = null;
    this.from = null;
  }
}

export interface Location {
  display: string;
  mark: number;
}

export interface GroupFare {
  key: string;
  values: Fare[];
  createdAt: Date;
  total: number;
}
