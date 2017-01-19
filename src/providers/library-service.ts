import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { LibraryData } from '../model/library-data'

/*
1. getAllTestDbItems (GET)
example: http://better-computer.com/testservice/Service2.svc/getAllTestDbItems

2. CreateTestDbItem (POST)
example: http://better-computer.com/testservice/Service2.svc/createTestDbItem

http://better-computer.com/testservice/Service2.svc/createTestDbItems
takes multiple json items in an array

3. deleteTestDbItem (GET)
example: http://better-computer.com/testservice/Service2.svc/deleteTestDbItem/2

http://better-computer.com/testservice/Service2.svc/deleteAllTestDbItems
deletes all the items
*/

@Injectable()
export class LibraryService {

  SERVER_URL = "http://better-computer.com/testservice/Service2.svc"

  constructor(public http: Http) {
  }

  syncToServer(list: LibraryData[]): Promise<any> {
    return this.deleteAllTestDbItems().then(() => {
      return this.createTestDbItems(list)}
    );
  }

  syncToClient() {
    return this.getAllTestDbItems()
  }

  private getAllTestDbItems(): Promise<any> {
    let self = this
    var promise = new Promise(function(resolve, reject) {
      var url = self.SERVER_URL + "/getAllTestDbItems";
      self.http.get(url).map(res => res.json()).subscribe(data => {
        console.log("getAllTestDbItems : " + JSON.stringify(data))
        var list: LibraryData[] = []
        for (let item of data) {
          let libraryData = new LibraryData()
          libraryData.cat = item.cat
          libraryData.subcat = item.subcat
          libraryData.item = item.item
          libraryData.dialog = item.dialog
          list.push(libraryData)
        }
        resolve(list)
      }, error => {
        console.log("error : " + JSON.stringify(error))
        reject(error)
      });
    });
    return promise;
  }

  private deleteAllTestDbItems(): Promise<any> {
    let self = this
    var promise = new Promise(function(resolve, reject) {
      var url = self.SERVER_URL + "/deleteAllTestDbItems";
      self.http.get(url).map(res => res.json()).subscribe(data => {
        console.log("deleteAllTestDbItems : " + JSON.stringify(data))
        resolve(data)
      }, error => {
        console.log("error : " + JSON.stringify(error))
        reject(error)
      });
    });
    return promise;
  }

  private createTestDbItems(list: LibraryData[]): Promise<any> {
    let self = this
    var promise = new Promise(function(resolve, reject) {
      var postData = [];
      for (let item of list) {
        postData.push({
          cat: item.cat,
          subcat: item.subcat,
          item: item.item,
          dialog: item.dialog
        })
      }
      let strPostData = JSON.stringify(postData)
      console.log("strPostData : " + strPostData)
      var url = self.SERVER_URL + "/createTestDbItems";
      self.http.post(url, strPostData).map(res => res.json()).subscribe(data => {
        console.log("createTestDbItems : " + JSON.stringify(data))
        resolve(data)
      }, error => {
        console.log("error : " + JSON.stringify(error))
        reject(error)
      });
    });
    return promise;
  }
}