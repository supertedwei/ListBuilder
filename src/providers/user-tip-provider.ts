import { Injectable, EventEmitter } from '@angular/core';

import { UserTipService } from './user-tip-service';
import { UserTipData } from '../model/user-tip-data'

@Injectable()
export class UserTipProvider {

  public listChanged$ = new EventEmitter();
  private list = [];

  constructor(private userTipService: UserTipService) {
    console.log('init UserTipProvider Provider');
    this.userTipService.getUserTips().then((data) => {
      if (data == null) {
        return;
      }
      this.list = JSON.parse(data);
      this.listChanged$.emit();
      console.log('[UserTipProvider] json loaded ! ');
    })
    .catch((error) => {
      console.log('[UserTipProvider] error : ' + error);
    });
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

  listUserTipData(cat, subcat, item): UserTipData[] {
    var result = []
    for (var data of this.list) {
      if (data.cat == cat && data.subcat == subcat && data.item == item) {
        result.push(data)
      }
    }
    return result
  }
}