import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { UserTipData } from '../model/user-tip-data'
import { User } from '../common/user';

/*
http://www.better-computer.com/notewriter/service1.svc/getusertips/narfdaddy@gmail.com
*/
@Injectable()
export class UserTipService {

  SERVER_URL = "http://better-computer.com/NoteWriter/Service1.svc"

  constructor(public http: Http) {
    console.log('Hello UserTipService Provider');
  }

  public getUserTips(): Promise<any> {
    let self = this
    var promise = new Promise(function(resolve, reject) {
      var url = self.SERVER_URL + "/getUserTips/" + encodeURIComponent(User.email);
      console.log("url : " + url)
      self.http.get(url).map(res => res.json()).subscribe(data => {
        console.log("getUserTips : " + JSON.stringify(data))
        var list: UserTipData[] = []
        for (let item of data) {
          let userTipData = new UserTipData()
          userTipData.cat = item.cat
          userTipData.subcat = item.subcat
          userTipData.item = item.item
          userTipData.dialog = item.dialog
          list.push(userTipData)
        }
        resolve(list)
      }, error => {
        console.log("error : " + JSON.stringify(error))
        reject(error)
      });
    });
    return promise;
  }

}
