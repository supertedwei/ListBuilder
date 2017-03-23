import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { UserTipProvider } from '../../providers/user-tip-provider';

/*
  Generated class for the UserTip page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-user-tip',
  templateUrl: 'user-tip.html'
})
export class UserTipPage {

  subscription

  categoryList = []
  subcategoryList = []
  userItemList = []
  userTipList = []

  selectedCategory;
  selectedSubcategory;
  selectedUserItem;
  selectedUserTip;

  constructor(public navCtrl: NavController, public navParams: NavParams,
      private userTipProvider: UserTipProvider) {
    this.subscription = this.userTipProvider.listChanged$.subscribe(() => {
      console.log('[UserTipPage] userTipProvider emitted')
      this.prepareCategoryList()
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserTipPage')
  }

  prepareCategoryList() {
    this.categoryList = this.userTipProvider.listCat()
    if (this.categoryList.length > 0) {
      this.selectedCategory = this.categoryList[0]
    } else {
      this.selectedCategory = null
    }
    this.prepareSubcategoryList()
  }

  onCategoryClicked(option) {
    console.log("onCategoryClicked")
    this.selectedCategory = option
    this.prepareSubcategoryList()
  }

  prepareSubcategoryList() {
    if (this.selectedCategory == null) {
      this.subcategoryList = []
      return
    }
    this.subcategoryList = this.userTipProvider.listSubcat(this.selectedCategory)
    if (this.subcategoryList.length > 0) {
      this.selectedSubcategory = this.subcategoryList[0]
    } else {
      this.selectedSubcategory = null
    }
    this.prepareUserItem()
  }

  onSubcategoryClicked(option) {
    console.log("onSubcategoryClicked")
    this.selectedSubcategory = option
    this.prepareUserItem()
  }

  prepareUserItem() {
    if (this.selectedSubcategory == null) {
      this.userItemList = []
      return
    }
    this.userItemList = this.userTipProvider.listItem(this.selectedCategory, this.selectedSubcategory)
    if (this.userItemList.length > 0) {
      this.selectedUserItem = this.userItemList[0]
    } else {
      this.selectedUserItem = null
    }
    this.prepareUserTip()
  }

  onUserItemClicked(option) {
    console.log("onUserItemClicked")
    this.selectedUserItem = option
    this.prepareUserTip()
  }

  prepareUserTip() {
    if (this.selectedUserItem == null) {
      this.userTipList = []
      return
    }
    this.userTipList = this.userTipProvider.listUserTipData(
        this.selectedCategory, this.selectedSubcategory, this.selectedUserItem)
        if (this.userItemList.length > 0) {
    this.selectedUserTip = this.userTipList[0]
    } else {
      this.selectedUserTip = null
    }
  }

  onUserTipClicked(option) {
    console.log("onUserTipClicked")
    this.selectedUserTip = option
  }

}
