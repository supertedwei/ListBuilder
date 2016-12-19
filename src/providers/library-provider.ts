import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class LibraryProvider {

  public message: any = "I'm new here";
  private list = [];

  constructor(private storage: Storage) {
    console.log('Hello LibraryProvider Provider');
  }

  setMessage(message) {
    this.message = message;
    console.log('message : ' + message);
    this.storage.set('message', message);
    this.storage.get('message').then((val) => {
       console.log('message2 : ', val);
    })
  }

  createOrUpdate(data: LibraryData) {
    if (data.id == null) {
      data.id = "001";
      this.list.push(data);
      this.saveToDb();
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
}
