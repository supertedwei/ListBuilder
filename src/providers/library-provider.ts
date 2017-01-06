import { Injectable, EventEmitter } from '@angular/core';
import { Storage } from '@ionic/storage';
import { UUID } from 'angular2-uuid';

@Injectable()
export class LibraryProvider {

  public listChanged$ = new EventEmitter();
  public message: any = "I'm new here";
  private list = [];

  constructor(private storage: Storage) {
    console.log('init LibraryProvider Provider');
    this.storage.get("LibraryDataList").then((data) => {
      if (data == null) {
        return;
      }
      this.list = JSON.parse(data);
      this.listChanged$.emit();
      console.log('[LibraryProvider] json loaded ! ');
    });
  }

  clean() {
    this.list.length = 0
    this.saveToDb()
  }

  listAll() {
    return this.list
  }

  listCat() {
    var result = []
    for (var item of this.list) {
      if (result.indexOf(item.cat) < 0) {
        result.push(item.cat)
      }
    }
    return result
  }

  listSubcat(cat) {
    var result = []
    for (var data of this.list) {
      if (data.cat == cat && result.indexOf(data.subcat) < 0) {
        result.push(data.subcat)
      }
    }
    return result
  }

  listItem(cat, subcat) {
    var result = []
    for (var data of this.list) {
      if (data.cat == cat && data.subcat == subcat && result.indexOf(data.item) < 0) {
        result.push(data.item)
      }
    }
    return result
  }

  getLibraryData(cat, subcat, item): LibraryData {
    for (var data of this.list) {
      if (data.cat == cat && data.subcat == subcat && data.item == item) {
        return data
      }
    }
  }

  createOrUpdate(data: LibraryData) {
    if (data.id == null) {
      data.id = UUID.UUID()
      if (data.dialog != 2) {
        data.range = null
      }
      this.list.push(data)
      this.saveToDb()
    }
  }

  private saveToDb() {
    let jsonString = JSON.stringify(this.list)
    console.log('jsonString : ', jsonString)
    this.storage.set('LibraryDataList', jsonString)
  }

}

export class LibraryData {
  static DIALOG_PERCENT = 1
  static DIALOG_RANGE = 2

  public id: string
  public cat: string
  public subcat: string
  public item: string
  public dialog: number = LibraryData.DIALOG_PERCENT
  public range: any = { lower: 0, upper: 100 }
}
