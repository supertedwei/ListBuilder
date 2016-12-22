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
    this.storage.get("LibraryDataList").then((val) => {
      if (val == null) {
        return;
      }
      this.list = JSON.parse(val);
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

  createOrUpdate(data: LibraryData) {
    if (data.id == null) {
      data.id = UUID.UUID()
      this.list.push(data)
      this.saveToDb()
    }
  }

  private saveToDb() {
    let jsonString = JSON.stringify(this.list);
    console.log('jsonString : ', jsonString);
    this.storage.set('LibraryDataList', jsonString);
  }

}

export class LibraryData {
  public id: string;
  public cat: string;
  public subcat: string;
  public item: string;
  public dialog: string;
  public range: any = { lower: 0, upper: 100 };
}
