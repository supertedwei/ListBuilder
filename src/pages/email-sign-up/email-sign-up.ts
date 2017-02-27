import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController } from 'ionic-angular';

import { AngularFire } from 'angularfire2';

import { EmailLoginPage } from '../email-login/email-login'

@Component({
  selector: 'page-email-sign-up',
  templateUrl: 'email-sign-up.html'
})
export class EmailSignUpPage {

  email: string = ""
  password: string = ""
  retypePassword: string = ""

  waiting = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
      public alertCtrl: AlertController, public af: AngularFire,
      public toastCtrl: ToastController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EmailSignUpPage');
  }

  onLoginClicked() {
    this.navCtrl.setRoot(EmailLoginPage);
  }

  onSignupClicked(): void {
    console.log("onSubmitClicked : " + this.email);
    if (this.email.length == 0) {
      this.showError('Email is empty');
      return;
    }
    if (this.password.length == 0) {
      this.showError('Password is empty');
      return;
    }
    if (this.password != this.retypePassword) {
      this.showError('Password and Retype are not same')
      return;
    }

    this.waiting = true;
    this.af.auth.createUser({email: this.email, password: this.password}).then(values => {
      console.log("createUser success : " + JSON.stringify(values));
      values.auth.sendEmailVerification();
      this.showMessage("A validation email has been sent to your email")
      this.waiting = false;
    }).catch(error => {
      console.log("createUser fail : " + JSON.stringify(error));
      this.waiting = false;
      this.showError(error.message)
    });
  }

  showError(subtitle: string): void {
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: subtitle,
      buttons: ['OK']
    });
    alert.present();
  }

  showMessage(message: string): void {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

}
