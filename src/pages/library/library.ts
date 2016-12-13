import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-library',
  templateUrl: 'library.html'
})
export class Library {

  items: Array<{title: string}>;

  constructor(public navCtrl: NavController) {

    this.items = [];
    for (let i = 1; i < 6; i++) {
      this.items.push({
        title: 'Item ' + i
      });
    }
    
  }

}
