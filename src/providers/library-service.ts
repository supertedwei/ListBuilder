import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { LibraryData } from '../model/library-data'
import { User } from '../common/user';

/*
1. getting JSON tablfor user (GET)
http://better-computer.com/NoteWriter/Service1.svc/getUserItems/narfdaddy@gmail.com

2. deleting JSON for user (GET)
http://better-computer.com/NoteWriter/Service1.svc/deleteUserItems/narfdaddy@gmail.com

3. uploading JSON for user (POST)
http://better-computer.com/NoteWriter/Service1.svc/addUserItems/
==> JSON array (as before, except each item should now include a usr attribute)
*/

@Injectable()
export class LibraryService {

  SERVER_URL = "http://better-computer.com/NoteWriter/Service1.svc"

  constructor(public http: Http) {
  }

  syncToServer(list: LibraryData[]): Promise<any> {
    return this.deleteUserItems().then(() => {
      return this.addUserItems(list)}
    );
  }

  syncToClient() {
    return this.getUserItems()
  }

  private getUserItems(): Promise<any> {
    let self = this
    var promise = new Promise(function(resolve, reject) {
      var url = self.SERVER_URL + "/getUserItems/" + encodeURIComponent(User.email);
      console.log("url : " + url)
      self.http.get(url).map(res => res.json()).subscribe(data => {
        console.log("getUserItems : " + JSON.stringify(data))
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

  private deleteUserItems(): Promise<any> {
    let self = this
    var promise = new Promise(function(resolve, reject) {
      var url = self.SERVER_URL + "/deleteUserItems/" + encodeURIComponent(User.email);
      self.http.get(url).map(res => res.json()).subscribe(data => {
        console.log("deleteUserItems : " + JSON.stringify(data))
        resolve(data)
      }, error => {
        console.log("error : " + JSON.stringify(error))
        reject(error)
      });
    });
    return promise;
  }

  private addUserItems(list: LibraryData[]): Promise<any> {
    let self = this
    var promise = new Promise(function(resolve, reject) {
      var postData = [];
      for (let item of list) {
        postData.push({
          cat: item.cat,
          subcat: item.subcat,
          item: item.item,
          dialog: item.dialog,
          usr: User.email
        })
      }
      let strPostData = JSON.stringify(postData)
      console.log("strPostData : " + strPostData)
      var url = self.SERVER_URL + "/addUserItems";
      self.http.post(url, strPostData).map(res => res.json()).subscribe(data => {
        console.log("addUserItems : " + JSON.stringify(data))
        resolve(data)
      }, error => {
        console.log("error : " + JSON.stringify(error))
        reject(error)
      });
    });
    return promise;
  }
}