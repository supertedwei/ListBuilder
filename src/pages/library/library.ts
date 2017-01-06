import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController, AlertController, ActionSheetController } from 'ionic-angular';
import { LibraryProvider, LibraryData } from '../../providers/library-provider';

@Component({
  selector: 'page-library',
  templateUrl: 'library.html'
})
export class Library {
  
  subscription

  clients: ClientData[] = [new ClientData()]
  currentClient: ClientData = this.clients[0]

  constructor(public navCtrl: NavController, private libraryProvider: LibraryProvider,
      private alertCtrl: AlertController, private actionSheetCtrl: ActionSheetController,
      private storage: Storage) {
    this.prepareOptions()
    this.subscription = this.libraryProvider.listChanged$.subscribe(() => {
      console.log('[Library] libraryProvider emitted')
      this.prepareOptions()
    });
    this.storage.get("LibraryClients").then((data) => {
      if (data == null) {
        return;
      }
      this.clients = JSON.parse(data);
      if (this.clients.length == 0) {
        this.clients = [new ClientData()];
      }
      this.currentClient = this.clients[0]
    });
  }

  ngOnDestroy() {
    console.log('subscription.unsubscribe')
    this.subscription.unsubscribe()

    let jsonString = JSON.stringify(this.clients)
    this.storage.set("LibraryClients", jsonString);
  }

  onOptionClicked(option) {
    console.log("optionClicked")
    if (this.currentClient.state == ClientData.STATE_CAT) {
      this.currentClient.cat = option
      this.currentClient.state = ClientData.STATE_SUBCAT
      this.prepareOptions()
    } else if (this.currentClient.state == ClientData.STATE_SUBCAT) {
      this.currentClient.subcat = option
      this.currentClient.state = ClientData.STATE_ITEM
      this.prepareOptions()
    } else if (this.currentClient.state == ClientData.STATE_ITEM) {
      this.currentClient.item = option
      this.currentClient.state = ClientData.STATE_DIALOG
      this.prepareOptions()
    }
  }

  gotoCat() {
    this.currentClient.setStateCat()
    this.prepareOptions()
  }

  gotoSubcat() {
    this.currentClient.setStateSubcat()
    this.prepareOptions()
  }

  gotoItem() {
    this.currentClient.setStateItem()
    this.prepareOptions()
  }

  prepareOptions() {
    this.currentClient.options = [];
    if (this.currentClient.state == ClientData.STATE_CAT) {
      this.currentClient.options = this.libraryProvider.listCat()
    } else if (this.currentClient.state == ClientData.STATE_SUBCAT) {
      this.currentClient.options = this.libraryProvider.listSubcat(this.currentClient.cat)
    } else if (this.currentClient.state == ClientData.STATE_ITEM) {
      this.currentClient.options = this.libraryProvider.listItem(this.currentClient.cat, this.currentClient.subcat)
    } else if (this.currentClient.state == ClientData.STATE_DIALOG) {
      var library = this.libraryProvider.getLibraryData(this.currentClient.cat, this.currentClient.subcat, this.currentClient.item)
      if (library.dialog == LibraryData.DIALOG_PERCENT) {
        this.currentClient.dialogRangeMin = "0"
        this.currentClient.dialogRangeMax = "100"
      } else {
        this.currentClient.dialogRangeMin = library.range.lower
        this.currentClient.dialogRangeMax = library.range.upper
      }
    }
  }

  isShowAddButton() {
    return this.currentClient.state == ClientData.STATE_DIALOG
  }

  isShowPostButton() {
    return this.currentClient.libraryPostDatas.length > 0
  }

  onAddClicked() {
    var libraryPostData = new LibraryPostData()
    libraryPostData.cat = this.currentClient.cat
    libraryPostData.subcat = this.currentClient.subcat
    libraryPostData.item = this.currentClient.item
    libraryPostData.dialogValue = this.currentClient.dialogValue
    this.currentClient.libraryPostDatas.push(libraryPostData)
    console.log("libraryPostDatas : " + JSON.stringify(this.currentClient.libraryPostDatas))
    this.gotoCat()
  }

  onPostClicked() {
    console.log("onPostClicked")
    this.currentClient.libraryPostDatas.length = 0
    this.gotoCat()
  }

  toString(itemData) {
    return JSON.stringify(itemData)
  }

  onRemoveClient() {
    this.clients = this.clients.filter(item => item !== this.currentClient);
    if (this.clients.length > 0) {
      this.currentClient = this.clients[0]
    } else {
      this.clients = [new ClientData()]
      this.currentClient = this.clients[0]
      this.prepareOptions()
    }
  }

  onAddClientClicked() {
    console.log("onAddClientClicked")
    var clientData = new ClientData()
    this.clients.push(clientData)
    this.currentClient = clientData
    this.prepareOptions()
  }

  onSwitchClientClicked() {
    console.log("onSwitchClientClicked")

    var buttonList = []
    for (var index in this.clients) {
      var button = {}
      button["text"] = this.clients[index].clientName
      button["position"] = index
      button["parent"] = this
      button["handler"] = function() {
        console.log("position : " + this.position)
        this.parent.currentClient = this.parent.clients[this.position]
        this.parent.prepareOptions()
      }
      buttonList.push(button)
    }

    let actionSheet = this.actionSheetCtrl.create({
      title: 'Switch Client',
      buttons: buttonList
    });
    actionSheet.present();
  }

}

class LibraryPostData {
  cat: string
  subcat: string
  item: string
  dialogValue: number
}

class ClientData {
  static STATE_CAT = 1
  static STATE_SUBCAT = 2
  static STATE_ITEM = 3
  static STATE_DIALOG = 4

  clientName: string = "Client_" + new Date().getTime()
  state = ClientData.STATE_CAT
  cat: string
  subcat: string
  item: string
  dialogValue: number
  dialogRangeMin: string
  dialogRangeMax: string
  options: Array<string>
  libraryPostDatas: LibraryPostData[] = []

  setStateCat() {
    this.cat = null
    this.subcat = null
    this.item = null
    this.dialogValue = null
    this.dialogRangeMin = null
    this.dialogRangeMax = null
    this.state = ClientData.STATE_CAT
  }

  setStateSubcat() {
    this.subcat = null
    this.item = null
    this.dialogValue = null
    this.dialogRangeMin = null
    this.dialogRangeMax = null
    this.state = ClientData.STATE_SUBCAT
  }

  setStateItem() {
    this.item = null
    this.dialogValue = null
    this.dialogRangeMin = null
    this.dialogRangeMax = null
    this.state = ClientData.STATE_ITEM
  }
}
