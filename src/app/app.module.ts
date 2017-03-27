import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AppVersion } from '@ionic-native/app-version';
import { EmailComposer } from '@ionic-native/email-composer';

// Import the AF2 Module
import { AngularFireModule } from 'angularfire2';

import { FirebaseConfig } from './config';
import { Library } from '../pages/library/library';
import { TestDbPage } from '../pages/test-db/test-db';
import { RangeDialogPage } from '../pages/range-dialog/range-dialog'
import { PercentDialogPage } from '../pages/percent-dialog/percent-dialog'
import { OptionsDialogPage } from '../pages/options-dialog/options-dialog'
import { LibraryProvider } from '../providers/library-provider';
import { LibraryService } from '../providers/library-service'
import { EmailProvider } from '../providers/email-provider';
import { UserTipService } from '../providers/user-tip-service';
import { UserTipProvider } from '../providers/user-tip-provider';
import { IonicStorageModule } from '@ionic/storage'
import { EmailSignUpPage } from '../pages/email-sign-up/email-sign-up';
import { EmailLoginPage } from '../pages/email-login/email-login';
import { SettingsPage } from '../pages/settings/settings';
import { UserTipPage } from '../pages/user-tip/user-tip';

@NgModule({
  declarations: [
    MyApp,
    Library,
    TestDbPage,
    RangeDialogPage,
    PercentDialogPage,
    OptionsDialogPage,
    EmailSignUpPage,
    EmailLoginPage,
    SettingsPage,
    UserTipPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(FirebaseConfig),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Library,
    TestDbPage,
    RangeDialogPage,
    PercentDialogPage,
    OptionsDialogPage,
    EmailSignUpPage,
    EmailLoginPage,
    SettingsPage,
    UserTipPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AppVersion,
    EmailComposer,
    LibraryProvider,
    EmailProvider,
    LibraryService,
    UserTipService,
    UserTipProvider
  ]
})
export class AppModule {}
