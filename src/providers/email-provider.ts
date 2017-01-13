import { Injectable } from '@angular/core';
import { Platform, AlertController } from 'ionic-angular';
import { EmailComposer } from 'ionic-native';

/*
  Generated class for the EmailProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class EmailProvider {

  constructor(public platform: Platform, public alertCtrl: AlertController) {
    console.log('Hello EmailProvider Provider');
  }

  send(message: string): Promise<any> {
    if (!this.platform.is('cordova')) {
      let alert = this.alertCtrl.create({
        title: 'Error!',
        subTitle: 'Not a Cordova platform!',
        buttons: ['OK']
      });
      alert.present();
      return Promise.reject("Not a Cordova platform");
    }

    let email = {
      subject: 'ListBuilder Message',
      body: message,
      isHtml: true
    };
    // Send a text message using default options
    console.log("open email app");
    return EmailComposer.open(email);
  }

}
