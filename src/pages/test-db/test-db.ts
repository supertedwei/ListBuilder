import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LibraryProvider, LibraryData } from '../../providers/library-provider';

@Component({
  selector: 'page-test-db',
  templateUrl: 'test-db.html'
})
export class TestDbPage {

  private subscription
  libraryData = new LibraryData()
  libraryDataList = []

  constructor(public navCtrl: NavController, private libraryProvider: LibraryProvider) {
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

  onStartRangeClicked() {
    this.libraryData.dialog += "[start: RANGE(arg1,arg2)]\n";
  }

  onEndRangeClicked() {
    this.libraryData.dialog += "[end: RANGE(arg1,arg2)]\n";
  }

  onPercentClicked() {
    this.libraryData.dialog += "[percent: PERCENT(arg)]\n";
  }

}
