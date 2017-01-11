import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

/*
  Generated class for the OptionsDialog page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-options-dialog',
  templateUrl: 'options-dialog.html'
})
export class OptionsDialogPage {

  optionsDialogData = new OptionsDialogData()
  newArg: String = ""

  constructor(public viewCtrl: ViewController) {}

  ionViewDidLoad() {
    console.log('Hello OptionsDialogPage Page');
  }

  onAddNewArg(): void {
    this.optionsDialogData.args.push(this.newArg);
    this.newArg = "";
  }

  onCancelClicked() {
    this.viewCtrl.dismiss();
  }

  onOkClicked() {
    this.viewCtrl.dismiss(this.optionsDialogData);
  }

}

export class OptionsDialogData {
  label: String;
  args: String[] = [];
}
