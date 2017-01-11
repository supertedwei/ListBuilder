import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

/*
  Generated class for the RangeDialog page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-range-dialog',
  templateUrl: 'range-dialog.html'
})
export class RangeDialogPage {

  rangeDialogData = new RangeDialogData();

  constructor(public viewCtrl: ViewController) {}

  ionViewDidLoad() {
    console.log('Hello RangeDialogPage Page');
  }

  onCancelClicked() {
    this.viewCtrl.dismiss();
  }

  onOkClicked() {
    this.viewCtrl.dismiss(this.rangeDialogData);
  }

}

export class RangeDialogData {
  label: String;
  arg1: String;
  arg2: String;
}
