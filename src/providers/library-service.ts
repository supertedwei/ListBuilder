import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { LibraryData } from '../model/library-data'

@Injectable()
export class LibraryService {

  SERVER_URL = "http://better-computer.com/testservice/Service2.svc"

  constructor(public http: Http) {
  }

  syncToServer(list: LibraryData[]): Promise<any> {
    return Promise.all([this.deleteAllTestDbItems(), this.createTestDbItems(list)]);
  }

  syncToClient() {

  }

  private deleteAllTestDbItems() {
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