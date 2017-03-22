import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the UserItem page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-user-item',
  templateUrl: 'user-item.html'
})
export class UserItemPage {

  categoryList = ["cat1", "cat2", "cat3"]
  subcategoryList = ["subcat1", "subcat2", "subcat3"]
  userItemList = ["userItem1", "userItem2", "userItem3"]
  userTipList = ["userTip1", "userTip2", "userTip3"]

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserItemPage');
  }

}
