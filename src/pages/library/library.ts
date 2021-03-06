import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController, AlertController, ActionSheetController } from 'ionic-angular';
import { LibraryProvider } from '../../providers/library-provider';
import { LibraryData } from '../../model/library-data'
import { EmailProvider } from '../../providers/email-provider';

@Component({
  selector: 'page-library',
  templateUrl: 'library.html'
})
export class Library {
  
  subscription

  dialogParser = new DialogParser()
  clients: ClientData[] = [new ClientData()]
  currentClient: ClientData = this.clients[0]

  constructor(public navCtrl: NavController, private libraryProvider: LibraryProvider,
      private alertCtrl: AlertController, private actionSheetCtrl: ActionSheetController,
      private storage: Storage, private emailProvider: EmailProvider) {
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
      this.prepareOptions()
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
    this.setStateCat()
    this.prepareOptions()
  }

  gotoSubcat() {
    this.setStateSubcat()
    this.prepareOptions()
  }

  gotoItem() {
    this.setStateItem()
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
      var library: LibraryData = this.libraryProvider.getLibraryData(this.currentClient.cat, this.currentClient.subcat, this.currentClient.item)
      console.log("library.dialog : " + library.dialog)
      this.currentClient.rawDialog = library.dialog
      this.currentClient.dialogs = this.dialogParser.parse(library.dialog)
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
    libraryPostData.rawDialog = this.currentClient.rawDialog
    libraryPostData.dialogs = this.currentClient.dialogs
    this.currentClient.libraryPostDatas.push(libraryPostData)
    console.log("libraryPostDatas : " + JSON.stringify(this.currentClient.libraryPostDatas))
    this.gotoCat()
  }

  onSendClicked() {
    console.log("onSendClicked")
    let jsonLibraryPostDatas = JSON.stringify(this.currentClient.libraryPostDatas);
    console.log("jsonLibraryPostDatas : " + jsonLibraryPostDatas)

    var fullMessage = "";
    for (let libraryPostData of this.currentClient.libraryPostDatas) {
      var dialogMessage = libraryPostData.rawDialog;
      for (let dialogItem of libraryPostData.dialogs) {
        if (dialogItem.keyword == "PERCENT") {
          dialogMessage = dialogMessage.replace(dialogItem.formula, dialogItem.value + "%");
        } else {
          dialogMessage = dialogMessage.replace(dialogItem.formula, dialogItem.value);
        }
        console.log("dialogMessage : " + dialogMessage)
      }
      fullMessage = fullMessage + dialogMessage + "."
    }
    console.log("fullMessage : " + fullMessage)

    var p: Promise<any> = this.emailProvider.send(fullMessage);
    console.log("Promise : " + p);
    p.then(data => 
      console.log("Send : " + data)
    ).catch(error =>
      console.log("error : " + error)
    );
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

  onRemoveLibraryPostData(libraryPostData) {
    this.currentClient.libraryPostDatas = this.currentClient.libraryPostDatas.filter(item => item !== libraryPostData)
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

  setStateCat() {
    this.currentClient.cat = null
    this.currentClient.subcat = null
    this.currentClient.item = null
    this.currentClient.rawDialog = null
    this.currentClient.dialogs = null
    this.currentClient.state = ClientData.STATE_CAT
  }

  setStateSubcat() {
    this.currentClient.subcat = null
    this.currentClient.item = null
    this.currentClient.rawDialog = null
    this.currentClient.dialogs = null
    this.currentClient.state = ClientData.STATE_SUBCAT
  }

  setStateItem() {
    this.currentClient.item = null
    this.currentClient.rawDialog = null
    this.currentClient.dialogs = null
    this.currentClient.state = ClientData.STATE_ITEM
  }
}

export class DialogParser {
  parse(dialogString: string): DialogData[] {
    dialogString = dialogString.replace(" ", "");
    var result: DialogData[] = []

    var objRE = new RegExp("\\[\\w*:?[A-Z]*(\\((\\w|\\,)*\\))?\\]", "g");
    var dialogArray = dialogString.match(objRE); 
    console.log("dialogArray : " + dialogArray);

    for (var dialogTemplate of dialogArray) {
      console.log("dialogTemplate : " + dialogTemplate);
      var dialogData = new DialogData()
      dialogData.formula = dialogTemplate
      var matchTitle = dialogTemplate.match(new RegExp("\\[\\w*:"));
      if (matchTitle != null) {
        dialogData.title = matchTitle[0].replace("[", "").replace(":", "")
        dialogData.keyword = dialogTemplate.match(new RegExp(":[A-Z]*(\\(|])"))[0].replace("]", "").replace("(", "").replace(":", "").trim()
      } else {
        dialogData.keyword = dialogTemplate.match(new RegExp(".*(\\(|])"))[0].replace("]", "").replace("[", "").replace("(", "").trim()
      }
      if (dialogData.keyword == "TEXT") {
        // no arguments
      } else {
        var args = dialogTemplate.match(new RegExp("\\(.*\\)"))[0].replace("(", "").replace(")", "").split(",")
        if (dialogData.keyword == "RANGE") {
          dialogData.arg1 = args[0]
          dialogData.arg2 = args[1]
        } else if (dialogData.keyword == "PERCENT") {
          dialogData.arg1 = args[0]
        } else if (dialogData.keyword == "OPTIONS") {
          dialogData.args = args
        }
      }
      result.push(dialogData)
      console.log("dialogData : " + JSON.stringify(dialogData))
    }

    return result
  }
}

class LibraryPostData {
  cat: string
  subcat: string
  item: string
  rawDialog: string
  dialogs: DialogData[]
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
  rawDialog: string
  dialogs: DialogData[]
  options: Array<string>
  libraryPostDatas: LibraryPostData[] = []
}

class DialogData {
  formula: string
  title: string
  keyword: string
  arg1: string
  arg2: string
  args: string[] = []
  value: string
}
