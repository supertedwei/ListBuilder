import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Library } from '../pages/library/library';
import { TestDbPage } from '../pages/test-db/test-db';
import { RangeDialogPage } from '../pages/range-dialog/range-dialog'
import { PercentDialogPage } from '../pages/percent-dialog/percent-dialog'
import { OptionsDialogPage } from '../pages/options-dialog/options-dialog'
import { LibraryProvider } from '../providers/library-provider';
import { LibraryService } from '../providers/library-service'
import { EmailProvider } from '../providers/email-provider';
import { Storage } from '@ionic/storage';

@NgModule({
  declarations: [
    MyApp,
    Library,
    TestDbPage,
    RangeDialogPage,
    PercentDialogPage,
    OptionsDialogPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Library,
    TestDbPage,
    RangeDialogPage,
    PercentDialogPage,
    OptionsDialogPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Storage,
    LibraryProvider,
    EmailProvider,
    LibraryService
  ]
})
export class AppModule {}
