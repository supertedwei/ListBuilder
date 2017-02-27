import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController } from 'ionic-angular';

import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';

import { EmailSignUpPage } from '../email-sign-up/email-sign-up'

@Component({
  selector: 'page-email-login',
  templateUrl: 'email-login.html'
})
export class EmailLoginPage {

  email: string = ""
  password: string = ""

  waiting = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
      public alertCtrl: AlertController, public af: AngularFire,
      public toastCtrl: ToastController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignUpPage');
  }

  onSignupClicked() {
    this.navCtrl.setRoot(EmailSignUpPage);
  }

  onLoginClicked(): void {
    console.log("onSubmitClicked : " + this.email);
    if (this.email.length == 0) {
      this.showError('Email is empty');
      return;
    }
    if (this.password.length == 0) {
      this.showError('Password is empty');
      return;
    }

    this.waiting = true;
    this.af.auth.login(
      {email: this.email, password: this.password}, 
      {provider: AuthProviders.Password, method: AuthMethods.Password})
    .then(values => {
      console.log("login success : " + JSON.stringify(values));
      if (!values.auth.emailVerified) {
        let alert = this.alertCtrl.create({
          title: 'Login',
          subTitle: "Your email has not been verified yet",
          buttons: [
            {
              text: 'OK',
              handler: data => {
                console.log('OK clicked');
                this.navCtrl.setRoot(EmailLoginPage)
              }
            },
            {
              text: 'Resend',
              handler: data => {
                console.log('Resend clicked');
                values.auth.sendEmailVerification();
                this.showMessage("A validation email has been sent to your email")
                this.navCtrl.setRoot(EmailLoginPage)
              }
            }
          ]
        });
        alert.present();
      }
      this.waiting = false;
    }).catch(error => {
      console.log("login fail : " + JSON.stringify(error));
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
