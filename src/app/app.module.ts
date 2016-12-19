import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Library } from '../pages/library/library';
import { Page2 } from '../pages/page2/page2';
import { TestDbPage } from '../pages/test-db/test-db';
import { LibraryProvider } from '../providers/library-provider';
import { Storage } from '@ionic/storage';

@NgModule({
  declarations: [
    MyApp,
    Library,
    Page2,
    TestDbPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Library,
    Page2,
    TestDbPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Storage,
    LibraryProvider
  ]
})
export class AppModule {}
