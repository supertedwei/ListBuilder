import { Component } from '@angular/core';
import { NavController, PopoverController, LoadingController, Loading, ActionSheetController } from 'ionic-angular';

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

   ev = {
    target : {
      getBoundingClientRect : () => {
        return {
          top: '0'
        };
      }
    }
  };

  constructor(public navCtrl: NavController, private libraryProvider: LibraryProvider,
      public popoverCtrl: PopoverController, public libraryService: LibraryService,
      public loadingCtrl: LoadingController, public actionSheetCtrl: ActionSheetController) {
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

  onPickForDialogClicked() {
    let self = this
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Pick For Dialog',
      buttons: [
        {
          text: 'RANGE',
          handler: () => {
            console.log('RANGE clicked');
            self.onRangeClicked()
          }
        },{
          text: 'PERCENT',
          handler: () => {
            console.log('PERCENT clicked');
            self.onPercentClicked()
          }
        },{
          text: 'OPTIONS',
          handler: () => {
            console.log('OPTIONS clicked');
            self.onOptionsClicked()
          }
        }
      ]
    });
    actionSheet.present();
  }

  onRangeClicked() {
    let popover = this.popoverCtrl.create(RangeDialogPage);
    popover.present({ev: this.ev});
    popover.onDidDismiss(data => {
      if (data == null) {
        return;
      }
      let rangeDialogData: RangeDialogData = data;
      this.libraryData.dialog += `[RANGE(${rangeDialogData.arg1},${rangeDialogData.arg2})]`;
    });
  }

  onPercentClicked() {
    let popover = this.popoverCtrl.create(PercentDialogPage);
    popover.present({ev: this.ev});
    popover.onDidDismiss(data => {
      if (data == null) {
        return;
      }
      let percentDialogData: PercentDialogData = data;
      this.libraryData.dialog += `[PERCENT(${percentDialogData.arg})]`;
    });
  }

  onOptionsClicked() {
    let popover = this.popoverCtrl.create(OptionsDialogPage);
    popover.present({ev: this.ev});
    popover.onDidDismiss(data => {
      if (data == null) {
        return;
      }
      let optionsDialogData: OptionsDialogData = data;
      this.libraryData.dialog += `[OPTIONS(${optionsDialogData.args.join(",")})]`;
    });
  }

  onDownloadClicked() {
    this.presentLoading()
    this.libraryService.syncToClient().then((list) => {
      this.libraryDataList = list
      this.libraryProvider.resetAll(list)
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
