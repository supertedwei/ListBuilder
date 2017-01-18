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
    let self = this
    var promise = new Promise(function(resolve, reject) {
      // resolve();
      self.http.get('https://www.reddit.com/r/gifs/new/.json?limit=10').map(res => res.json()).subscribe(data => {
        console.log("data2 : " + JSON.stringify(data))
        resolve(data)
      }, error => {
        console.log("error : " + JSON.stringify(error))
        reject(error)
      });
      // // do a thing, possibly async, then…

      // if (/* everything turned out fine */) {
      //   resolve("Stuff worked!");
      // }
      // else {
      //   reject(Error("It broke"));
      // }
    });
    return promise;


    // this.http.get('http://better-computer.com/testservice/Service2.svc/getAllTestDbItems').subscribe(data => {
    //     console.log("data3 : " + data)
    // });

    // var postData = [];
    // for (let item of list) {
    //   postData.push({
    //     cat: item.cat,
    //     subcat: item.subcat,
    //     item: item.item,
    //     dialog: item.dialog
    //   })
    // }
    // let strPostData = JSON.stringify(postData)
    // console.log("strPostData : " + strPostData)
    // this.http.post(this.SERVER_URL + "/createTestDbItems", strPostData).subscribe(data => {
    //     console.log("data : " + data)
    // });
  }

  syncToClient() {

  }
}