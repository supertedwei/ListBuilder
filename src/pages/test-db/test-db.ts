import { Component } from '@angular/core';
import { NavController, PopoverController } from 'ionic-angular';
import { LibraryProvider, LibraryData } from '../../providers/library-provider';

import { RangeDialogPage, RangeDialogData } from '../range-dialog/range-dialog'
import { PercentDialogPage, PercentDialogData } from '../percent-dialog/percent-dialog'

@Component({
  selector: 'page-test-db',
  templateUrl: 'test-db.html'
})
export class TestDbPage {

  private subscription
  libraryData = new LibraryData()
  libraryDataList = []

  constructor(public navCtrl: NavController, private libraryProvider: LibraryProvider,
      public popoverCtrl: PopoverController) {
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
    // let data = new LibraryData();
    // data.cat = "cat_001"
    // data.subcat = "subcat_001"
    // data.item = "item_001"
    // data.dialog = "dialog_001"
    // this.libraryProvider.createOrUpdate(data);
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

}
