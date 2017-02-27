import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { AppVersion } from 'ionic-native';

import { AngularFire } from 'angularfire2';

import { Library } from '../pages/library/library';
import { TestDbPage } from '../pages/test-db/test-db';
import { EmailLoginPage } from '../pages/email-login/email-login';
import { User } from '../common/user';
import { SettingsPage } from '../pages/settings/settings';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  showMenu = false;
  rootPage: any = Library;
  activePage: any;

  pages: Array<{title: string, component: any}>;

  versionNumber = 'not available';

  constructor(public platform: Platform, public af: AngularFire) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Library', component: Library },
      { title: 'Test DB Page', component: TestDbPage },
      { title: 'Settings', component: SettingsPage },
    ];

    this.activePage = this.pages[0];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();

      if (this.platform.is('cordova')) {
        AppVersion.getVersionNumber().then((s) => {
          this.versionNumber = s;
          console.log('versionNumber : ' + this.versionNumber);
        })
      } else {
        console.log('not a cordova platform');
      }

      this.af.auth.subscribe(user => {
        console.log("MyApp : user - " + JSON.stringify(user));
        if (user != null && user.auth.emailVerified) {
          this.showMenu = true;
          User.uid = user.auth.uid
          User.email = user.auth.email
          this.nav.setRoot(Library)
        } else {
          this.showMenu = false;
          User.reset();
          this.nav.setRoot(EmailLoginPage)
        }
      });

    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
    this.activePage = page;
  }

  checkActive(page) {
    return page == this.activePage;
  }
}
