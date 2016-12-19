import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LibraryProvider, LibraryData } from '../../providers/library-provider';

@Component({
  selector: 'page-test-db',
  templateUrl: 'test-db.html'
})
export class TestDbPage {

  constructor(public navCtrl: NavController, private libraryProvider: LibraryProvider) {
    
  }

  ionViewDidLoad() {
    console.log('Hello TestDbPage Page');
    let data = new LibraryData();
    data.cat = "cat_001"
    data.subcat = "subcat_001"
    data.item = "item_001"
    data.dialog = "dialog_001"
    this.libraryProvider.createOrUpdate(data);
  }

}
