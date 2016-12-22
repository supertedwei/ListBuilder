import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { LibraryProvider, LibraryData } from '../../providers/library-provider';

@Component({
  selector: 'page-library',
  templateUrl: 'library.html'
})
export class Library {

  private static STATE_CAT = 1
  private static STATE_SUBCAT = 2
  private static STATE_ITEM = 3
  private static STATE_DIALOG = 4
  
  state = Library.STATE_CAT
  subscription
  cat: string
  subcat: string
  item: string
  dialogValue: number
  dialogRangeMin: string
  dialogRangeMax: string
  options: Array<string>
  libraryPostDatas: LibraryPostData[] = []

  constructor(public navCtrl: NavController, private libraryProvider: LibraryProvider) {
    this.prepareOptions()
    this.subscription = this.libraryProvider.listChanged$.subscribe(() => {
      console.log('[Library] libraryProvider emitted')
      this.prepareOptions()
    });
  }

  ngOnDestroy() {
    console.log('subscription.unsubscribe')
    this.subscription.unsubscribe()
  }

  onOptionClicked(option) {
    console.log("optionClicked")
    if (this.state == Library.STATE_CAT) {
      this.cat = option
      this.state = Library.STATE_SUBCAT
      this.prepareOptions()
    } else if (this.state == Library.STATE_SUBCAT) {
      this.subcat = option
      this.state = Library.STATE_ITEM
      this.prepareOptions()
    } else if (this.state == Library.STATE_ITEM) {
      this.item = option
      this.state = Library.STATE_DIALOG
      this.prepareOptions()
    }
  }

  gotoCat() {
    this.cat = null
    this.subcat = null
    this.item = null
    this.dialogValue = null
    this.dialogRangeMin = null
    this.dialogRangeMax = null
    this.state = Library.STATE_CAT
    this.prepareOptions()
  }

  prepareOptions() {
    this.options = [];
    if (this.state == Library.STATE_CAT) {
      this.options = this.libraryProvider.listCat()
    } else if (this.state == Library.STATE_SUBCAT) {
      this.options = this.libraryProvider.listSubcat(this.cat)
    } else if (this.state == Library.STATE_ITEM) {
      this.options = this.libraryProvider.listItem(this.cat, this.subcat)
    } else if (this.state == Library.STATE_DIALOG) {
      var library = this.libraryProvider.getLibraryData(this.cat, this.subcat, this.item)
      if (library.dialog == LibraryData.DIALOG_PERCENT) {
        this.dialogRangeMin = "0"
        this.dialogRangeMax = "100"
      } else {
        this.dialogRangeMin = library.range.lower
        this.dialogRangeMax = library.range.upper
      }
    }
  }

  isShowAddButton() {
    return this.state == Library.STATE_DIALOG
  }

  isShowPostButton() {
    return this.libraryPostDatas.length > 0
  }

  onAddClicked() {
    var libraryPostData = new LibraryPostData()
    libraryPostData.cat = this.cat
    libraryPostData.subcat = this.subcat
    libraryPostData.item = this.item
    libraryPostData.dialogValue = this.dialogValue
    this.libraryPostDatas.push(libraryPostData)
    console.log("libraryPostDatas : " + JSON.stringify(this.libraryPostDatas))
    this.gotoCat()
  }

  onPostClicked() {
    console.log("onPostClicked")
    this.libraryPostDatas.length = 0
  }

  toString(itemData) {
    return JSON.stringify(itemData)
  }

}

export class LibraryPostData {
  cat: string
  subcat: string
  item: string
  dialogValue: number
}
