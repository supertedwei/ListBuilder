import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AngularFire } from 'angularfire2';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
      public af: AngularFire) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  onLogoutClicked() {
    this.af.auth.logout();
  }

}
