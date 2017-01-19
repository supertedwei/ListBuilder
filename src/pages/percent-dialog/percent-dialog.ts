import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

/*
  Generated class for the PercentDialog page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-percent-dialog',
  templateUrl: 'percent-dialog.html'
})
export class PercentDialogPage {

  percentDialogData = new PercentDialogData();

  constructor(public viewCtrl: ViewController) {}

  ionViewDidLoad() {
    console.log('Hello PercentDialogPage Page');
  }

  onCancelClicked() {
    this.viewCtrl.dismiss();
  }

  onOkClicked() {
    this.viewCtrl.dismiss(this.percentDialogData);
  }

}

export class PercentDialogData {
  arg: String;
}
