import { Component } from '@angular/core';
import { NavController, PopoverController, LoadingController, Loading } from 'ionic-angular';

import { LibraryProvider } from '../../providers/library-provider';
import { LibraryService } from '../../providers/library-service'
import { LibraryData } from '../../model/library-data'

import { RangeDialogPage, RangeDialogData } from '../range-dialog/range-dialog'
import { PercentDialogPage, PercentDialogData } from '../percent-dialog/percent-dialog'
import { OptionsDialogPage, OptionsDialogData } from '../options-dialog/options-dialog'

@Component({
  selector: 'page-test-db',
  templateUrl: 'test-db.html'
})
export class TestDbPage {

  private subscription
  libraryData = new LibraryData()
  libraryDataList = []
  loader: Loading

  constructor(public navCtrl: NavController, private libraryProvider: LibraryProvider,
      public popoverCtrl: PopoverController, public libraryService: LibraryService,
      public loadingCtrl: LoadingController) {
    console.log('init TestDbPage')
    this.libraryDataList = this.libraryProvider.listAll()
    this.subscription = this.libraryProvider.listChanged$.subscribe(() => {
      console.log('[TestDbPage] libraryProvider emitted')
      this.libraryDataList = this.libraryProvider.listAll()
    });
  }

  ngOnDestroy() {
    console.log('subscription.unsubscribe')
    this.subscription.unsubscribe()
  }

  ionViewDidLoad() {
    console.log('Hello TestDbPage Page') 
  }

  onCreatedClicked() {
    console.log('onCreatedClicked : ', JSON.stringify(this.libraryData))
    this.libraryProvider.createOrUpdate(this.libraryData)
    this.libraryData = new LibraryData()
  }

  onCleanDbClicked() {
    console.log('onCleanDbClicked')
    this.libraryProvider.clean()
    this.libraryData = new LibraryData()
  }

  toString(itemData) {
    return JSON.stringify(itemData)
  }

  onRangeClicked() {
    let popover = this.popoverCtrl.create(RangeDialogPage);
    popover.present();
    popover.onDidDismiss(data => {
      if (data == null) {
        return;
      }
      let rangeDialogData: RangeDialogData = data;
      this.libraryData.dialog += `[${rangeDialogData.label}: RANGE(${rangeDialogData.arg1},${rangeDialogData.arg2})]\n`;
    });
  }

  onPercentClicked() {
    let popover = this.popoverCtrl.create(PercentDialogPage);
    popover.present();
    popover.onDidDismiss(data => {
      if (data == null) {
        return;
      }
      let percentDialogData: PercentDialogData = data;
      this.libraryData.dialog += `[${percentDialogData.label}: PERCENT(${percentDialogData.arg})]\n`;
    });
  }

  onOptionsClicked() {
    let popover = this.popoverCtrl.create(OptionsDialogPage);
    popover.present();
    popover.onDidDismiss(data => {
      if (data == null) {
        return;
      }
      let optionsDialogData: OptionsDialogData = data;
      this.libraryData.dialog += `[${optionsDialogData.label}: OPTIONS(${optionsDialogData.args.join(",")})]\n`;
    });
  }

  onDownloadClicked() {
    this.presentLoading()
    this.libraryService.syncToClient().then((list) => {
      this.libraryDataList = list
      this.dismissLoding()
    }).catch(() => {
      this.dismissLoding()
    });
  }

  onUploadClicked() {
    this.presentLoading()
    this.libraryService.syncToServer(this.libraryDataList).then(() => {
      this.dismissLoding()
    }).catch(() => {
      this.dismissLoding()
    });
  }

  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000
    });
    this.loader.present();
  }

  dismissLoding() {
    if (this.loader != null) {
      this.loader.dismiss()
      this.loader = null
    }
  }
}
