import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-library',
  templateUrl: 'library.html'
})
export class Library {

  private static STATE_CAT = 1;
  private static STATE_SUBCAT = 2;
  private static STATE_ITEM = 3;
  private static STATE_DIALOG = 4;
  private static STATE_POST = 5;
  private state = Library.STATE_CAT;
  
  cat: string;
  subcat: string;
  item: string;
  dialog: string;

  options: Array<{title: string}>;

  constructor(public navCtrl: NavController) {
    this.prepareOptions();
  }

  onOptionClicked(option) {
    console.log("optionClicked")
    if (this.state == Library.STATE_CAT) {
      this.cat = option.title
      this.state = Library.STATE_SUBCAT;
      this.prepareOptions();
    } else if (this.state == Library.STATE_SUBCAT) {
      this.subcat = option.title
      this.state = Library.STATE_ITEM;
      this.prepareOptions();
    } else if (this.state == Library.STATE_ITEM) {
      this.item = option.title
      this.state = Library.STATE_DIALOG;
      this.prepareOptions();
    } else if (this.state == Library.STATE_DIALOG) {
      this.dialog = option.title
      this.state = Library.STATE_POST;
      this.prepareOptions();
    }
  }

  prepareOptions() {
    this.options = [];
    if (this.state == Library.STATE_CAT) {
      for (let i = 1; i < 6; i++) {
        this.options.push({
          title: 'Cat ' + i
        });
      }
    } else if (this.state == Library.STATE_SUBCAT) {
      for (let i = 1; i < 7; i++) {
        this.options.push({
          title: 'Subcat ' + i
        });
      }
    } else if (this.state == Library.STATE_ITEM) {
      for (let i = 1; i < 3; i++) {
        this.options.push({
          title: 'Item ' + i
        });
      }
    } else if (this.state == Library.STATE_DIALOG) {
      for (let i = 1; i < 4; i++) {
        this.options.push({
          title: 'Dialog ' + i
        });
      }
    }
  }

  isShowPostButton() {
    return this.state == Library.STATE_POST
  }

  onPostClicked() {
    console.log("onPostClicked")
  }

}
