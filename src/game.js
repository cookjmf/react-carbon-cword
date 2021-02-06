import React from 'react';
import Init from './init';
import Message from './message';
import Param from './param';
import Play from './play';

import Cword from './cword';
import MsgMgr from './msgMgr';

import * as Util from './util';

class Game extends React.Component {
  constructor(props) {   
    super(props);
    console.log('Game : constructor : enter');

    // enables a child to call onChangeXXXX with the selected value

    // init
    this.onChangeAction = this.onChangeAction.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeNewName = this.onChangeNewName.bind(this);
    this.onChangeSize = this.onChangeSize.bind(this);
    // message
    this.onClickMessageClose = this.onClickMessageClose.bind(this);
    this.onClickMessageConfirm = this.onClickMessageConfirm.bind(this);
    // param
    this.onClickParamCell = this.onClickParamCell.bind(this);
    this.onKeyUpParamAcrossTextarea = this.onKeyUpParamAcrossTextarea.bind(this);
    this.onKeyUpParamDownTextarea = this.onKeyUpParamDownTextarea.bind(this);
    this.onKeyUpImportTextarea = this.onKeyUpImportTextarea.bind(this);
    // play
    this.onClickPlayCell = this.onClickPlayCell.bind(this);
    this.onChangePlayCell = this.onChangePlayCell.bind(this); // TODO : share with on key up
    this.onKeyUpPlayCell = this.onKeyUpPlayCell.bind(this);
    this.onKeyDownPlayCell = this.onKeyDownPlayCell.bind(this);
    this.onClickAcrossClue = this.onClickAcrossClue.bind(this);
    this.onClickDownClue = this.onClickDownClue.bind(this);
    
    // message manager
    this.msgMgr = new MsgMgr();

    // state
    this.state = {
      updateTimestamp: '',
      existingNames: null,
      action: '',
      msg: null,
      cword: null,
    };
  }

  componentDidMount() {
    console.log('Game : componentDidMount : enter');
    this.storeGetNames();
  }

  componentDidUpdate() {
    // console.log('Game : componentDidUpdate : enter');
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('Game : shouldComponentUpdate : enter');
    let res = false;
    console.log('Game : shouldComponentUpdate : this.state.updateTimestamp : ...'+this.state.updateTimestamp+'...');
    console.log('Game : shouldComponentUpdate : nextState.updateTimestamp : ....'+nextState.updateTimestamp+'...');
    if (this.state.updateTimestamp !== nextState.updateTimestamp) {
      res = true;
      console.log('Game : shouldComponentUpdate : new value for state.updateTimestamp so will render');
    } else {
      console.log('Game : shouldComponentUpdate : SAME value for state.updateTimestamp so will NOT render');
    }
    return res;
  }

  // on methods
  // CAN CHANGE STATE

  onChangeAction(ev) {

    let selectedItem = ev.selectedItem;
    let newActionId = selectedItem.id;
    let newAction = selectedItem.text;
    let newActionValue = selectedItem.value;

    console.log('Game : START : -------------------------------------------->');
    console.log('Game : START : onChangeAction ----> id : '+newActionId+' --------->');
    console.log('Game : START : onChangeAction ----> text : '+newAction+' --------->');
    console.log('Game : START : onChangeAction ----> value : '+newActionValue+' --------->');
    console.log('Game : START : -------------------------------------------->');


    let existingNames = this.state.existingNames;

    if (newAction === Util.ACTION_CREATE_EXAMPLE) {
      let names = [];

      for (var [key,val] of Util.EXAMPLE_MAP) {
        console.log(key +'...'+val.length);
        if (!existingNames.includes(key)) {
          names.push(key);
        }
      }

      this.setState({ action: newAction, cword: null,
        existingNames: names, 
        updateTimestamp: Util.newDate() }); 


    } else if (newAction === Util.ACTION_CLEAR) {

      this.storeGetNames();

    } else if (newAction === Util.ACTION_IMPORT) {

      let cword = new Cword();

      this.setState({ action: newAction, cword: cword, msg: null,
        updateTimestamp: Util.newDate() }); 

    } else {

      this.setState({ action: newAction, cword: null, msg: null,
        updateTimestamp: Util.newDate() }); 
    }   
  }

  onChangeName(ev) {

    let selectedItem = ev.selectedItem;
    let newNameId = selectedItem.id;
    let newName = selectedItem.text;
    let newNameValue = selectedItem.value;

    console.log('Game : START : -------------------------------------------->');
    console.log('Game : START : onChangeName ----> id : '+newNameId+' --------->');
    console.log('Game : START : onChangeName ----> text : '+newName+' --------->');
    console.log('Game : START : onChangeName ----> value : '+newNameValue+' --------->');
    console.log('Game : START : -------------------------------------------->');
  
  // onChangeName(newName) {

  //   console.log('Game : START : -------------------------------------------->');
  //   console.log('Game : START : onChangeName ----> '+newName+' --------->');
  //   console.log('Game : START : -------------------------------------------->');

    // console.log('Game : onChangeName : enter : newName : ...'+newName+'...');
    //   
    let action = this.state.action;
    if (action === Util.ACTION_DELETE) {
      let cword = new Cword();
      cword.name = newName;

      this.storeDelete(cword);
    } else if (action === Util.ACTION_CREATE_EXAMPLE) {

      let cwObj = Util.EXAMPLE_MAP.get(newName);
      if (cwObj != null) {    
        let cword = new Cword();
        cword.setupCwordFromStorageObject(cwObj);
    
        this.storeSave(cword);
      } else {
        console.log("logic error : no example found named : "+newName);
      }
    } else if (action === Util.ACTION_PLAY) {
      this.storeGet(newName);
    } else if (action === Util.ACTION_UPDATE) {
      this.storeGet(newName);
    } else if (action === Util.ACTION_EXPORT) {
      this.storeGet(newName);
    } else if (action === Util.ACTION_IMPORT) {

    } else {
      // other actions here

    }

  }

  onChangeNewName(newName) {

    console.log('Game : START : -------------------------------------------->');
    console.log('Game : START : onChangeNewName ----> '+newName+' --------->');
    console.log('Game : START : -------------------------------------------->');

    let action = this.state.action;
    if (action === Util.ACTION_CREATE) {

      let cword = new Cword();
      cword.name = newName;
      this.setState({ cword: cword }); 

      if (Util.isExample(newName)) {

        // this.setupNew(cword);
        // this is an error case

        this.msgMgr.addError('Invalid name, reserved for example');

        this.setState({ 
          msg : this.msgMgr.msg() , updateTimestamp: Util.newDate()
        });

      } 
    } else {
      console.log("logic error : in onChangeNewName but action is not CREATE");
    }
  }

  onChangeSize(newSize) {

    console.log('Game : START : -------------------------------------------->');
    console.log('Game : START : onChangeSize ----> '+newSize+' --------->');
    console.log('Game : START : -------------------------------------------->');  

    let cword = this.state.cword;
    cword.init(newSize);

    let action = this.state.action;
    if (action === Util.ACTION_CREATE) {

      let name = cword.name;

      let existingNames = this.state.existingNames;
      
      if (!Util.isValidName(name)) {
        this.msgMgr.addError('Invalid name : '+name);
        this.setState({ 
          msg : this.msgMgr.msg() , updateTimestamp: Util.newDate()
        });
  
      } else if (Util.isDuplicateName(existingNames, name)) {
        this.msgMgr.addError('Duplicate name : '+name);
        this.setState({ 
          msg : this.msgMgr.msg() , updateTimestamp: Util.newDate()
        });
      } else {
  
        let cwObj = Util.EXAMPLE_MAP.get(name);
        if (cwObj != null) {    
          console.log('Game : setupNew : example case : not valid here');

        } else {
          console.log('Game : setupNew : non example case');
  
          this.storeSave(cword);
        }
      }
    

    } else {
      console.log("logic error : in onChangeSize but action is not CREATE");
    }
  }

  onClickMessageClose() {
    console.log('Game : START : -------------------------------------------->');
    console.log('Game : START : onClickMessageClose ------------------------>');
    console.log('Game : START : -------------------------------------------->');  

    this.msgMgr.clear(); 

    let cword = this.state.cword;
    let name = '';
    if (cword != null) {
      name = cword.name;
    }
    let action = this.state.action;
    let existingNames = this.state.existingNames;

    if (action === Util.ACTION_CREATE) {
      if (!Util.isValidName(name) || Util.isDuplicateName(existingNames, name)) {
        // force user to choose "Size" again
        this.setState( { 
          selectedAction: Util.ACTION_CREATE, 
          selectedSize: Util.SIZE_TITLE, 
          msg: null, 
          updateTimestamp: Util.newDate() } 
          );  
      } else {
        this.storeGetNames();
      }
    } else if (action === Util.ACTION_CREATE_EXAMPLE) {
      this.storeGetNames();
    } else if (action === Util.ACTION_DELETE) {
      this.storeGetNames();
    } else if (action === Util.ACTION_EXPORT) {
      this.storeGetNames();
    } else if (action === Util.ACTION_IMPORT) {
      let msg = this.state.msg;
      if (msg != null && msg.errorId === Util.ERROR_INVALID_IMPORT_JSON) {
        // invalid json for import so enable user to update it
        this.setState( { 
          selectedAction: Util.ACTION_IMPORT, 
          msg: null, 
          updateTimestamp: Util.newDate() } 
          ); 
      } else {
        this.setState({ msg: null, action: null, cword: null });       
        this.storeGetNames();
      }
    } else {

      // message displayed before action chosen
      this.setState({ msg: null,
        updateTimestamp: Util.newDate() }); 
    }
  }

  onClickMessageConfirm(id) {
    console.log('Game : START : -------------------------------------------->');
    console.log('Game : START : onClickMessageConfirm -----> '+id+'------------------->');
    console.log('Game : START : -------------------------------------------->');  

    if (id === Util.CONFIRM_VALIDATE) {
      let cword = this.state.cword;
      let msg = cword.validate();

      this.setState( { 
        msg: msg, 
        updateTimestamp: Util.newDate() 
      });

    } else if (id === Util.CONFIRM_IMPORT) {

      let cword = this.state.cword;

      try {
        let value = cword.importJson;
  
        let cwObj = JSON.parse(value);

        let cwordNew = new Cword();

        cwordNew.setupCwordFromStorageObject(cwObj);

        let msg = cwordNew.msgMgr.msg();
        
        if (msg == null) {

          msg = cwordNew.validateForImport();
  
          if (msg == null) {
          
            this.storeSave(cwordNew);
          }
  
        } else {
   
          msg.prefix = 'Failed Validation.';
          msg.errorId = Util.ERROR_INVALID_IMPORT_JSON;
          this.setState( { 
            msg: msg, 
            updateTimestamp: Util.newDate() 
          });
        }

      } catch (err) {
        this.msgMgr.addErrorId('Invalid JSON. '+err, '', Util.ERROR_INVALID_IMPORT_JSON);

        this.setState( { 
          msg: this.msgMgr.msg(), 
          updateTimestamp: Util.newDate() 
        });
      }
    }
  }

  onClickParamCell(id) {

    console.log('Game : START : -------------------------------------------->');
    console.log('Game : START : onClickParamCell ----> '+id+'------------->');
    console.log('Game : START : -------------------------------------------->');  

    let cword = this.state.cword;
    cword.toggleParamCell(id);

    this.storeSave(cword);
  }

  onKeyUpParamAcrossTextarea(ev) {

    var elem = ev.currentTarget;
    var id = elem.id;
    var value = elem.value;
    let type = ev.type;

    console.log('Game : START : -------------------------------------------->');
    console.log('Game : START : onKeyUpParamAcrossTextarea ----> '+id+' ------------->');
    console.log('Game : START : onKeyUpParamAcrossTextarea ----> type : '+type+' ------------->');
    console.log('Game : START : onKeyUpParamAcrossTextarea ----> value : '+value+' ------------->');
    console.log('Game : START : -------------------------------------------->'); 

    if (type === 'change') {

      let atext = Util.convertCluesRomanDash(value);
      atext = Util.convertCluesDash(atext);

      let cword = this.state.cword;
      cword.horizClues = atext;
      cword.paramTextareaSelected = Util.TA_ACROSS_CLUES;
      cword.paramAcrossCluesStart = elem.selectionStart;
      cword.paramAcrossCluesEnd = elem.selectionEnd;

      console.log('horizClues = '+cword.horizClues);
      console.log('paramTextareaSelected = '+cword.paramTextareaSelected);
      console.log('paramAcrossCluesStart = '+cword.paramAcrossCluesStart);
      console.log('paramAcrossCluesEnd = '+cword.paramAcrossCluesEnd);

      this.storeSave(cword);

    } else {
      console.log('ignore since not a change');
    }

  }

  onKeyUpParamDownTextarea(ev) {

    var elem = ev.currentTarget;
    var id = elem.id;
    var value = elem.value;
    let type = ev.type;

    console.log('Game : START : -------------------------------------------->');
    console.log('Game : START : onKeyUpParamDownTextarea ----> '+id+' ------------->');
    console.log('Game : START : onKeyUpParamDownTextarea ----> type : '+type+' ------------->');
    console.log('Game : START : onKeyUpParamDownTextarea ----> value : '+value+' ------------->');
    console.log('Game : START : -------------------------------------------->'); 

    if (type === 'change') {

      let dtext = Util.convertCluesRomanDash(value);
      dtext = Util.convertCluesDash(dtext);

      let cword = this.state.cword;
      cword.vertClues = dtext;

      cword.paramTextareaSelected = Util.TA_DOWN_CLUES;
      cword.paramDownCluesStart = elem.selectionStart;
      cword.paramDownCluesEnd = elem.selectionEnd;

      this.storeSave(cword);

    } else {
      console.log('ignore since not a change');
    }

  }

  onClickPlayCell(ev) {

    var elem = ev.currentTarget;
    var id = elem.id;

    console.log('Game : START : -------------------------------------------->');
    console.log('Game : START : onClickPlayCell ----> id: '+id+' ------------->');
    console.log('Game : START : -------------------------------------------->');  

    let cword = this.state.cword;
    let msg = cword.buildForPlay();

    if (msg != null) {
      // this.setState({ msg: msg, cword: cword,
      //   updateTimestamp: Util.newDate() }); 

    } else {
      cword.cellClicked(id);

      this.setState({ msg: null, cword: cword,
        updateTimestamp: Util.newDate() }); 
    }
  }

  onChangePlayCell(ev) {

    // changes handled in "onKeyUpPlayCell"
    // react complains if no onChange handler exists

    var elem = ev.currentTarget;
    var id = elem.id;
    var value = elem.value;

    // console.log('Game : START : -------------------------------------------->');
    console.log('Game : START : onChangePlayCell ----> id : '+id+' ------------->');
    console.log('Game : START : onChangePlayCell ----> value : '+value+' ------------->');
    // console.log('Game : START : -------------------------------------------->');  

    // let cword = this.state.cword;
    // cword.cellChanged(id, value);
    // this.storeSave(cword);
    
  }

  onKeyUpPlayCell(ev) {

    var elem = ev.currentTarget;
    var id = elem.id;

    console.log('Game : START : -------------------------------------------->');
    console.log('Game : START : onKeyUpPlayCell ----> id : '+id+' ------------->');
    console.log('Game : START : -------------------------------------------->');   

    let cword = this.state.cword;
    let value = cword.keyUpPlayCell(ev);

    if (value != null) {
      console.log('Game : got value : ['+value+']');
      cword.cellChanged(id, value);
      this.storeSave(cword);

    } else {

      this.setState({ msg: null, cword: cword,
        updateTimestamp: Util.newDate() }); 
    }

  }

  onKeyDownPlayCell(ev) {

    var elem = ev.currentTarget;
    var id = elem.id;

    console.log('Game : START : -------------------------------------------->');
    console.log('Game : START : onKeyDownPlayCell ----> id : '+id+' ------------->');
    console.log('Game : START : -------------------------------------------->');  

    let cword = this.state.cword;
    let result = cword.keyDownPlayCell(ev);

    this.setState({ msg: null, cword: cword,
      updateTimestamp: Util.newDate() }); 

    return result;
  }

  onClickAcrossClue(id) {

    console.log('Game : START : -------------------------------------------->');
    console.log('Game : START : onClickAcrossClue ----> '+id+'------------->');
    console.log('Game : START : -------------------------------------------->');  

    let cword = this.state.cword;
    cword.acrossClueClicked(id);

    this.setState({ msg: null, cword: cword,
      updateTimestamp: Util.newDate() }); 

  }

  onClickDownClue(id) {

    console.log('Game : START : -------------------------------------------->');
    console.log('Game : START : onClickDownClue ----> '+id+'------------->');
    console.log('Game : START : -------------------------------------------->');  

    let cword = this.state.cword;
    cword.downClueClicked(id);

    this.setState({ msg: null, cword: cword,
      updateTimestamp: Util.newDate() }); 
  }

  onKeyUpImportTextarea(ev) {

    var elem = ev.currentTarget;
    var id = elem.id;
    var value = elem.value;
    let type = ev.type;

    console.log('Game : START : -------------------------------------------->');
    console.log('Game : START : onKeyUpImportTextarea ----> '+id+' ------------->');
    console.log('Game : START : onKeyUpImportTextarea ----> type : '+type+' ------------->');
    console.log('Game : START : onKeyUpImportTextarea ----> value : '+value+' ------------->');
    console.log('Game : START : -------------------------------------------->');   

    if (type === 'change') {

      let cword = this.state.cword;
      cword.importJson = value;

      cword.paramTextareaSelected = Util.TA_IMPORT;
      cword.paramImportStart = elem.selectionStart;
      cword.paramImportEnd = elem.selectionEnd;

      console.log('importJson = '+cword.importJson);
      console.log('paramTextareaSelected = '+cword.paramTextareaSelected);
      console.log('paramImportStart = '+cword.paramImportStart);
      console.log('paramImportEnd = '+cword.paramImportEnd);

      this.msgMgr.addConfirmInfo('', 'Import', Util.CONFIRM_IMPORT);

      this.setState({ msg: this.msgMgr.msg(), cword: cword,
        updateTimestamp: Util.newDate() }); 

    } else {
      console.log('ignore since not a change');
    }

  }

  // store methods
  // DO NOT CHANGE STATE HERE

  storeGet(name) {
    console.log('Game : storeGet : enter : name : '+name);

    let url = Util.apiUrl()+'/cwords/name/'+name;
    let method = 'GET';

    console.log('Game : storeGet : ... url = '+url+' ... method = '+method);
  
    fetch(url)
    .then(
      response => {
        return response.json();
      }
    )
    .then(
      data => {
        console.log('Game : storeGet : fetch : data : ...'+JSON.stringify(data)+'...');
        let cwObj = JSON.parse(data.contents)
        this.resultGet(cwObj, true, name, null);
      }
    )
    .catch(
      err => {
        console.log('Game : storeGet : catch : err');
        Util.showErr(err);
        this.resultGet(null, false, name, err);
      }
    ) 
  }
  
  storeDelete(cword) {
    let name = cword.name;
    console.log('Game : storeDelete : enter : name : '+name);
  
    let url = Util.apiUrl()+'/cwords/name/'+name;
    let method = 'DELETE';

    console.log('Game : storeDelete : ... url = '+url+' ... method = '+method);

    fetch(url, {
      method: method,
    })
    .then(
      response => {
        return response.json();
      }
    )
    .then(
      data => {
        console.log('Game : storeDelete : fetch : data = ...'+JSON.stringify(data)+'...');
        this.resultDelete(true, cword, null);
      }
    )
    .catch(
      err => {

        console.log('Game : storeDelete : catch : err');
        Util.showErr(err);
        this.resultDelete(false, cword, err);
      }
    ) 
  }

  storeSave(cwObj) {
    console.log('Game : storeSave : enter');
  
    // for play and update - assume the cword exists
    // for other cases, (new, new-example, import) check first

    let action = this.state.action;

    if (action === Util.ACTION_PLAY || action === Util.ACTION_UPDATE) {
      this.storeUpdate(cwObj);
    } else {

      let url = Util.apiUrl()+'/cwords';
      let method = 'GET';

      console.log('Game : storeSave : ... url = '+url+' ... method = '+method);
  
      fetch(url)
      .then(
        response => {
          return response.json();
        }
      )
      .then(
        data => {
          console.log('Game : storeSave : fetch : data : ...'+JSON.stringify(data)+'...');
          let names = [];
          for (let i=0; i<data.length; i++) {
            let row = data[i];
            let name = row.name;
            names.push(name);
          }
          console.log('Game : storeSave : fetch : names = ...'+JSON.stringify(names)+'...');
          if (names.includes(cwObj.name)) {
            this.storeUpdate(cwObj);
          } else {
            this.storeInsert(cwObj);
          }
        }
      )
      .catch(
        err => {

          console.log('Game : storeSave : catch : err');
          Util.showErr(err);

          this.resultSave(cwObj, false, err);
        }
      ) 
    }  
  }

  storeInsert(cwObj) {
    console.log('Game : storeInsert : enter');
    let objectForStore = cwObj.getStorageObject();

    let url = Util.apiUrl()+'/cwords';
    let method = 'POST';

    console.log('Game : storeInsert : ... url = '+url+' ... method = '+method);

    fetch(url, {
      method: method, 
      headers: {
       'Content-type': 'application/json; charset=UTF-8' 
      },
      body: JSON.stringify(objectForStore)  
     })
    .then(
      response => {
        return response.json();
      }
    )
    .then(
      data => {
        console.log('Game : storeInsert : fetch : data : ...'+JSON.stringify(data)+'...');
        this.resultInsert(cwObj, true, null);
      }
    )
    .catch(
      err => {
        console.log('Game : storeInsert : catch : err');
        Util.showErr(err);
        this.resultInsert(cwObj, false, err);
      }
    )  
  }
  
  storeUpdate(cwObj) {
    console.log('Game : storeUpdate : enter');

    let objectForStore = cwObj.getStorageObject();

    let url = Util.apiUrl()+'/cwords/name/'+cwObj.name;
    let method = 'PUT';

    console.log('Game : storeInsert : ... url = '+url+' ... method = '+method);

    fetch(url, {
      method: method, 
      headers: {
       'Content-type': 'application/json; charset=UTF-8' 
      },
      body: JSON.stringify(objectForStore)  
     })
    .then(
      response => {
        return response.json();
      }
    )
    .then(
      data => {
        console.log('Game : storeUpdate : fetch : data : ...'+JSON.stringify(data)+'...');
        this.resultUpdate(cwObj, true, null);
      }
    )
    .catch(
      err => {
        console.log('Game : storeUpdate : catch : err');
        Util.showErr(err);
        this.resultUpdate(cwObj, false, err);
      }
    )  
  }
  
  storeGetNames() {
    console.log('Game : storeGetNames : enter');

    let url = Util.apiUrl()+'/cwords';
    let method = 'GET';

    console.log('Game : storeGetNames : ... url = '+url+' ... method = '+method);

    fetch(url)
      .then(
        response => {
          return response.json();
        }
      )
      .then(
        data => {
          console.log('Game : storeGetNames : fetch : data : ...'+Util.shorten(JSON.stringify(data),200)+'...');
  
          let names = [];
          for (let i=0; i<data.length; i++) {
            let row = data[i];
            let name = row.name;
            console.log('Game : storeGetNames : ... i='+i+' ...name='+name+'...');
            if (Util.isExample(name)) {
              if (Util.isDuplicateName(names, name)) {
                console.log('Game : storeGetNames : WARNING : found duplicate example name in store : ...'+name+'...');
              } else {
                names.push(name);
              } 
            } else if (Util.isValidName(name)) {
              if (Util.isDuplicateName(names, name)) {
                console.log('Game : storeGetNames : WARNING : found duplicate name in store : ...'+name+'...');
              } else {
                names.push(name);
              }            
            } else {
              console.log('Game : storeGetNames : WARNING : found invalid name in store : ...'+name+'...');
            }
          
          }
          this.resultGetNames(true, names, null);
          
        }
      )
      .catch(
        err => {

          console.log('Game : storeGetNames : catch : err');
          Util.showErr(err);

          this.resultGetNames(false, [], err);

        }
      )
  }

  // result methods, called:
  // - after store methods 
  // - set the updateTimestamp here, which forces re-render
  // CAN CHANGE STATE  

  resultGetNames(ok, names, err) {
    console.log('Game : resultGetNames : enter');
    if (!ok) {
      this.msgMgr.addError('Failed to get crossword names. '+err);
      let msg = this.msgMgr.msg();
      this.setState( { existingNames: names, 
        cword: null, action: '', 
        msg: msg , updateTimestamp: Util.newDate()} );

    } else {
      this.setState( { existingNames: names, 
        cword: null, action: '', 
        msg: null , updateTimestamp: Util.newDate()} );
    }

  }

  resultSave(cwObj, ok, err) {
    console.log('Game : resultSave : enter');
    let action = this.state.action;
    if (action === Util.ACTION_IMPORT) {
      this.resultUpdateImport(cwObj, ok, err);
    } else if (action === Util.ACTION_PLAY) {
      this.resultPlayUpdate(cwObj, ok, err);
    } else if (action === Util.ACTION_CREATE) {
      this.resultCreateSave(cwObj, ok, err);
    } else if (action === Util.ACTION_UPDATE) {
      this.resultUpdateSave(cwObj, ok, err);
    }
  }

  resultUpdate(cwObj, ok, err) {
    console.log('Game : resultUpdate : enter');
    let action = this.state.action;
    if (action === Util.ACTION_IMPORT) {
      this.resultUpdateImport(cwObj, ok, err);
    } else if (action === Util.ACTION_PLAY) {
      this.resultPlayUpdate(cwObj, ok, err);
    } else if (action === Util.ACTION_CREATE) {
      this.resultCreateUpdate(cwObj, ok, err);
    } else if (action === Util.ACTION_UPDATE) {
      this.resultUpdateUpdate(cwObj, ok, err);
    }
  }

  resultInsert(cwObj, ok, err) {
    console.log('Game : resultInsert : enter');
    let action = this.state.action;
    if (action === Util.ACTION_IMPORT) {
      this.resultCreateImport(cwObj, ok, err);
    } else if (action === Util.ACTION_PLAY) {
      // not possible
    } else if (action === Util.ACTION_CREATE) {
      this.resultCreateInsert(cwObj, ok, err);
    } else if (action === Util.ACTION_CREATE_EXAMPLE) {
      this.resultCreateInsertExample(cwObj, ok, err);
    } else if (action === Util.ACTION_UPDATE) {
      // not possible
    }
  }

  resultPlayUpdate(cwObj, ok, err) {
    console.log('Game : resultPlayUpdate : enter');
    let name = cwObj.name;
    if (!ok) {
      this.msgMgr.addError('Failed to save crossword : '+name+' . '+err);
    } 
    let msg = this.msgMgr.msg();
    this.setState( {
      msg: msg , cword: cwObj, updateTimestamp: Util.newDate()
    } );
  }

  resultCreateUpdate(cwObj, ok, err) {
    console.log('Game : resultCreateUpdate : enter');
    let name = cwObj.name;
    if (!ok) {
      this.msgMgr.addError('Failed to save crossword : '+name+' . '+err);
    } else {
      this.msgMgr.addConfirmInfo( 'Saved crossword : '+name+' at '+Util.date1(), "Validate" , Util.CONFIRM_VALIDATE);
    }

    let msg = this.msgMgr.msg();
    
    this.setState( {
      msg: msg , cword: cwObj, updateTimestamp: Util.newDate()
    } );
  }

  resultCreateImport(cwObj, ok, err) {
    console.log('Game : resultCreateImport : enter');
    let name = cwObj.name;
    if (!ok) {
      this.msgMgr.addError('Failed to save crossword : '+name+' . '+err);
    } else {
      this.msgMgr.addInfo( 'Saved crossword : '+name+' at '+Util.date1(), "Validate" , Util.CONFIRM_VALIDATE);
    }
    let msg = this.msgMgr.msg();
    let existingNames = Util.addIfNotIncludes(this.state.existingNames, cwObj.name);

    this.setState( {existingNames: existingNames,
      msg: msg , cword: cwObj, updateTimestamp: Util.newDate()
    } );
  }

  resultUpdateImport(cwObj, ok, err) {
    console.log('Game : resultUpdateImport : enter');
    let name = cwObj.name;
    if (!ok) {
      this.msgMgr.addError('Failed to save crossword : '+name+' . '+err);
    } else {
      this.msgMgr.addInfo( 'Saved crossword : '+name+' at '+Util.date1(), "Validate" , Util.CONFIRM_VALIDATE);
    }
    let msg = this.msgMgr.msg();
    this.setState( {
      msg: msg , cword: cwObj, updateTimestamp: Util.newDate()
    } );
  }

  resultUpdateUpdate(cwObj, ok, err) {
    console.log('Game : resultUpdateUpdate : enter');
    let name = cwObj.name;
    if (!ok) {
      this.msgMgr.addError('Failed to save crossword : '+name+' . '+err);
    } else {
      this.msgMgr.addConfirmInfo( 'Updated crossword : '+name+' at '+Util.date1(), "Validate" ,Util.CONFIRM_VALIDATE);
    }
    let msg = this.msgMgr.msg();
    this.setState( {
      msg: msg , cword: cwObj, updateTimestamp: Util.newDate()
    } );
  }

  resultCreateInsert(cwObj, ok, err) {
    console.log('Game : resultCreateInsert : enter');
    let name = cwObj.name;
    if (!ok) {
      this.msgMgr.addError('Failed to save crossword : '+name+'. ' +err);
      
    } else {
      this.msgMgr.addInfo('Created crossword : '+name+', now set blanks and clues');  
      
    }
    let msg = this.msgMgr.msg();
    let existingNames = Util.addIfNotIncludes(this.state.existingNames, name);

    this.setState( {existingNames: existingNames,
      msg: msg , cword: cwObj, updateTimestamp: Util.newDate()
    } );
  }

  resultCreateInsertExample(cwObj, ok, err) {
    console.log('Game : resultCreateInsertExample : enter');
    let name = cwObj.name;
    if (!ok) {
      
      this.msgMgr.addError('Failed to save example crossword : '+name+'. ' +err);
    } else {
      
      this.msgMgr.addInfo('Created example crossword : '+name+'.');
    }
    let msg = this.msgMgr.msg();
    let existingNames = Util.addIfNotIncludes(this.state.existingNames, name);

    this.setState( {existingNames: existingNames,
      msg: msg , cword: cwObj, updateTimestamp: Util.newDate()
    } );
  }

  resultCreateSave(cwObj, ok, err) {
    console.log('Game : resultCreateSave : enter');
    let name = '?';
    if (cwObj != null) {
      name = cwObj.name;
    }
    if (!ok) {
      this.msgMgr.addError('Failed to save crossword : '+name+'. '+err);
    } else {
      // should not happen
    }
    let msg = this.msgMgr.msg();
    this.setState( {
      msg: msg , cword: cwObj, updateTimestamp: Util.newDate()
    } );
  }

  resultUpdateSave(cwObj, ok, err) {
    console.log('Game : resultUpdateSave : enter');
    let name = '?';
    if (cwObj != null) {
      name = cwObj.name;
    }
    if (!ok) {
      this.msgMgr.addError('Failed to save crossword : '+name+'. '+err);
    } else {
      // should not happen
    }
    let msg = this.msgMgr.msg();
    this.setState( {
      msg: msg , cword: cwObj, updateTimestamp: Util.newDate()
    } );
  }

  resultGet(cwObj, ok, name, err) {
    console.log('Game : resultGet : enter');

    let action = this.state.action;

    if (!ok) {
      this.msgMgr.addError('Failed to get crossword : '+name+'. '+err);
      let msg = this.msgMgr.msg();
      this.setState( {
        msg: msg , updateTimestamp: Util.newDate()
      } );

    } else {
      let cword = new Cword();
      cword.setupCwordFromStorageObject(cwObj);

      let msg = null;
      if (action === Util.ACTION_PLAY) {
        msg = cword.buildForPlay();
      } else if (action === Util.ACTION_UPDATE) {
        msg = cword.buildForUpdate();
      } else if (action === Util.ACTION_EXPORT) {
        this.msgMgr.addInfo('Copy this text and save for future import');
        msg = this.msgMgr.msg();
      }

      this.setState( { 
        msg: msg,
        cword: cword,
        updateTimestamp: Util.newDate()} );
  
    }
  }

  resultDelete(deletedOK, cword, err) {
    console.log('Game : resultDelete : enter');
    let name = cword.name;
    if (!deletedOK) {
      this.msgMgr.addError('Failed to delete crossword : '+name+'. '+err);
    } else {
      this.msgMgr.addInfo('Deleted crossword : '+name);
    }
    let msg = this.msgMgr.msg();
    this.setState( {msg : msg, cword: cword, updateTimestamp: Util.newDate()} );
  }

  // render methods
  // NEVER CHANGE STATE HERE
 
  renderCreate() {
    // chose create, show name, size
    console.log('Game : renderCreate : enter');
    // console.log('Game : renderCreate : state : '+JSON.stringify(this.state));
    return (
      <div className="game">   
        <Init 
          action={ this.state.action}
          selectedAction={Util.ACTION_CREATE}         
          selectedName={Util.NAME_TITLE}       
          existingNames={ this.state.existingNames }
          selectedSize={ Util.SIZE_TITLE }
          onChangeAction={ this.onChangeAction }
          onChangeName={ this.onChangeName }
          onChangeNewName={ this.onChangeNewName }
          onChangeSize={ this.onChangeSize }
        /> 
        <Message         
          msg={ this.state.msg }
          onClickMessageClose={ this.onClickMessageClose }
        />       
      </div>
    );
  }

  renderCreateExample() {
    // chose create, show name
    console.log('Game : renderCreateExample : enter');
    // console.log('Game : renderCreateExample : state : '+JSON.stringify(this.state));
    return (
      <div className="game">   
        <Init 
          action={ this.state.action}
          selectedAction={Util.ACTION_CREATE_EXAMPLE}         
          selectedName={Util.NAME_TITLE}       
          onChangeAction={ this.onChangeAction }
          onChangeName={ this.onChangeName }
          existingNames={ this.state.existingNames }
        /> 
        <Message         
          msg={ this.state.msg }
          onClickMessageClose={ this.onClickMessageClose }
        />       
      </div>
    );
  }

  renderCreateWithName() {
    // chose create, entered name, get size
    console.log('Game : renderCreateWithName : enter');
    // console.log('Game : renderCreateWithName : state : '+JSON.stringify(this.state));

    let cword = this.state.cword;

    return (
      <div className="game">   
        <Init 
          action={ this.state.action}
          selectedAction={Util.ACTION_CREATE}
          name={ cword.name}
          selectedName={this.state.name}
          size={ cword.size}
          selectedSize={ Util.SIZE_TITLE }
          onChangeAction={ this.onChangeAction }
          onChangeName={ this.onChangeName }
          onChangeNewName={ this.onChangeNewName }
          onChangeSize={ this.onChangeSize }
        /> 
        <Message         
          msg={ this.state.msg }
          onClickMessageClose={ this.onClickMessageClose }
        />       
      </div>
    );
  }

  renderMessage() {
    console.log('Game : renderMessage : enter');
    // console.log('Game : renderMessage : state : '+JSON.stringify(this.state));
    return (
      <div className="game"> 
        <Message         
          msg={ this.state.msg }
          onClickMessageClose={ this.onClickMessageClose }
        />
      </div>
    );
  }

  renderSetupNew() {
    // chose create, entered name, chose size
    console.log('Game : renderSetupNew : enter');
    // console.log('Game : renderSetupNew : state : '+JSON.stringify(this.state));

    let cword = this.state.cword;
    // selectedAction={ Util.ACTION_TITLE }
    return (
      <div className="game"> 
        <Init 
          action=''
          
          selectedSize={ cword.size }
          existingNames={ this.state.existingNames }
          onChangeAction={ this.onChangeAction }
        />
        <Message         
          msg={ this.state.msg }
          onClickMessageClose={ this.onClickMessageClose }
          onClickMessageConfirm={ this.onClickMessageConfirm }
        /> 
        <Param
          action= { this.state.action }
          cword={ cword}
          onClickParamCell={ this.onClickParamCell }
          onKeyUpParamAcrossTextarea={ this.onKeyUpParamAcrossTextarea }
          onKeyUpParamDownTextarea={ this.onKeyUpParamDownTextarea }
        />
      </div>
    );
  }

  

  renderUpdateWithName() {
    // chose update, entered name
    console.log('Game : renderUpdateWithName : enter');

    let cword = this.state.cword;
    // selectedAction={ Util.ACTION_TITLE }
    return (
      <div className="game"> 
        <Init 
          action=''
          
          selectedSize={ cword.size }
          existingNames={ this.state.existingNames }
          onChangeAction={ this.onChangeAction }
        />
        <Message         
          msg={ this.state.msg }
          onClickMessageClose={ this.onClickMessageClose }
          onClickMessageConfirm={ this.onClickMessageConfirm }
        /> 
        <Param
          action= { this.state.action }
          cword={ cword}
          onClickParamCell={ this.onClickParamCell }
          onKeyUpParamAcrossTextarea={ this.onKeyUpParamAcrossTextarea }
          onKeyUpParamDownTextarea={ this.onKeyUpParamDownTextarea }
        />
      </div>
    );
  }

  renderExportWithName() {
    // chose export, entered name
    console.log('Game : renderExportWithName : enter');

    let cword = this.state.cword;
    // selectedAction={ Util.ACTION_TITLE }
    return (
      <div className="game"> 
        <Init 
          action=''
          
          selectedSize={ cword.size }
          existingNames={ this.state.existingNames }
          onChangeAction={ this.onChangeAction }
        />
        <Message         
          msg={ this.state.msg }
          onClickMessageClose={ this.onClickMessageClose }
          onClickMessageConfirm={ this.onClickMessageConfirm }
        /> 
        <Param
          action= { this.state.action }
          cword={ cword}
        />
      </div>
    );
  }

  renderPlayWithName() {
    // chose play and name
    console.log('Game : renderPlayWithName : enter');
    // console.log('Game : renderPlay : state : '+JSON.stringify(this.state));

    let cword = this.state.cword;
    let updateTimestamp = this.state.updateTimestamp;
    // selectedAction={ Util.ACTION_TITLE }
    return (
      <div className="game"> 
        <Init 
          action=''
          
          existingNames={ this.state.existingNames }
          onChangeAction={ this.onChangeAction }
        />
        <Message         
          msg={ this.state.msg }
          onClickMessageClose={ this.onClickMessageClose }
          onClickMessageConfirm={ this.onClickMessageConfirm }
        /> 
        <Play
          cword={ cword }
          updateTimestamp={ updateTimestamp }
          onClickPlayCell={ this.onClickPlayCell }
          onChangePlayCell={ this.onChangePlayCell }
          onKeyUpPlayCell={ this.onKeyUpPlayCell }
          onKeyDownPlayCell={ this.onKeyDownPlayCell }
          onClickAcrossClue={ this.onClickAcrossClue }
          onClickDownClue={ this.onClickDownClue }
        />
      </div>
    );
  }

  renderPlay() {
    // chose play
    console.log('Game : renderPlay : enter');
    // console.log('Game : renderPlay : state : '+JSON.stringify(this.state));

    return (
      <div className="game"> 
        <Init 
          action={ this.state.action}
          selectedAction={Util.ACTION_PLAY}
          existingNames={ this.state.existingNames }
          onChangeName={ this.onChangeName }
          onChangeAction={ this.onChangeAction }
        /> 
        <Message         
          msg={ this.state.msg }
          onClickMessageClose={ this.onClickMessageClose }
        />   
      </div>
    );
  }

  renderDelete() {
    // chose delete
    console.log('Game : renderDelete : enter');
    console.log('Game : renderDelete : state : '+JSON.stringify(this.state));

    return (
      <div className="game"> 
        <Init 
          action={ this.state.action}
          selectedAction={Util.ACTION_DELETE}
          existingNames={ this.state.existingNames }
          onChangeName={ this.onChangeName }
          onChangeAction={ this.onChangeAction }
        /> 
        <Message         
          msg={ this.state.msg }
          onClickMessageClose={ this.onClickMessageClose }
        />   
      </div>
    );
  }

  renderUpdate() {
    // chose update
    console.log('Game : renderUpdate : enter');
    console.log('Game : renderUpdate : state : '+JSON.stringify(this.state));

    return (
      <div className="game"> 
        <Init 
          action={ this.state.action}
          selectedAction={Util.ACTION_UPDATE}
          existingNames={ this.state.existingNames }
          onChangeName={ this.onChangeName }
          onChangeAction={ this.onChangeAction }
        /> 
        <Message         
          msg={ this.state.msg }
          onClickMessageClose={ this.onClickMessageClose }
        />   
      </div>
    );
  }

  renderExport() {
    // chose export
    console.log('Game : renderExport : enter');
    console.log('Game : renderExport : state : '+JSON.stringify(this.state));

    return (
      <div className="game"> 
        <Init 
          action={ this.state.action}
          selectedAction={Util.ACTION_EXPORT}
          existingNames={ this.state.existingNames }
          onChangeName={ this.onChangeName }
          onChangeAction={ this.onChangeAction }
        /> 
        <Message         
          msg={ this.state.msg }
          onClickMessageClose={ this.onClickMessageClose }
        />   
      </div>
    );
  }

  renderImport() {
    // chose import
    console.log('Game : renderImport : enter');
    console.log('Game : renderImport : state : '+JSON.stringify(this.state));

    return (
      <div className="game"> 
        <Init 
          action={ this.state.action}
          selectedAction={Util.ACTION_IMPORT}
          existingNames={ this.state.existingNames }
          onChangeName={ this.onChangeName }
          onChangeAction={ this.onChangeAction }
        /> 
        <Message         
          msg={ this.state.msg }
          onClickMessageClose={ this.onClickMessageClose }
          onClickMessageConfirm={ this.onClickMessageConfirm }
        />   
        <Param
          cword = {this.state.cword}
          action= { this.state.action }
          onKeyUp={ this.onKeyUpImportTextarea }
        />
      </div>
    );
  }

  renderMessageAfterAction() {
    // chose delete / createExample
    console.log('Game : renderMessageAfterAction : enter');
    // console.log('Game : renderMessageAfterAction : state : '+JSON.stringify(this.state));

    let name = '';
    if (this.state.cword != null) {
      name = this.state.cword.name;
    }
     // selectedAction={Util.ACTION_TITLE}
    return (
      <div className="game"> 
        <Init 
          action={ this.state.action}
          
          name={ name}
          existingNames={ this.state.existingNames }
          onChangeName={ this.onChangeName }
          onChangeAction={ this.onChangeAction }
        /> 
        <Message         
          msg={ this.state.msg }
          onClickMessageClose={ this.onClickMessageClose }
        />   
      </div>
    );
  }

  renderInit() {
    console.log('Game : renderInit : enter');
    // console.log('Game : renderInit : state : '+JSON.stringify(this.state));
    return (
      <div className="game">   
        <Init 
          existingNames={ this.state.existingNames }
          onChangeAction={ this.onChangeAction }
        />    
        <Message         
          msg={ this.state.msg }
          onClickMessageClose={ this.onClickMessageClose }
        />      
      </div>
    );
  }

  render() {
    
    let action = this.state.action;

    let name = '';
    let size = '';
    let nameValid = false;
    let nameExists = false;
    let cword = this.state.cword;
    let existingNames = this.state.existingNames;
    if (cword != null) {
      name = cword.name;
      size = cword.size;
      nameValid = Util.isValidName(name);
      nameExists = Util.isDuplicateName(existingNames, name);
    }
    
    

    console.log('Game : START : -------------------------------------------->');
    console.log('Game : START : render ------------------------------------->');
    console.log('Game : START : ------- action : '+action+' ------------------------------------->');
    console.log('Game : START : ------- name : '+name+' ------------------------------------->');
    console.log('Game : START : ------- size : '+size+' ------------------------------------->');
    console.log('Game : START : ------- nameValid : '+nameValid+' ------------------------------------->');
    console.log('Game : START : ------- nameExists : '+nameExists+' ------------------------------------->');
    console.log('Game : START : -------------------------------------------->'); 

    if (action === Util.ACTION_CREATE) {
      if (name === '') {
        // name + size to be chosen
        console.log('Game : START : ------- CASE : Create/NoName -----> renderCreate'); 
        return this.renderCreate();
      } else {
        if (size === '') {
          // name has been chosen, size to be chosen
          console.log('Game : START : ------- CASE : Create/Name/NoSize -----> renderCreateWithName'); 
          return this.renderCreateWithName();
        } else {
          if (!nameValid) {
            console.log('Game : START : ------- CASE : Create/InvalidName/Size -----> renderCreateWithName'); 
            return this.renderCreateWithName();
          } else if (!nameExists) {
            // name, size has been chosen, name is valid, cword failed to save
            console.log('Game : START : ------- CASE : Create/ValidName/Size/NameNotExists -----> renderCreateWithName'); 
            return this.renderCreateWithName();
          } else {
            // at this point name exists if the save worked
            // name, size has been chosen, name is valid, cword saved, show message and params
            console.log('Game : START : ------- CASE : Create/ValidName/Size/NameExists -----> renderSetupNew'); 
            return this.renderSetupNew();
          }
          
        }
      }
    } else if (action === Util.ACTION_CREATE_EXAMPLE) {
      if (name === '') {
        // name to be chosen
        console.log('Game : START : ------- CASE : CreateExample/NoName -----> renderCreateExample'); 
        return this.renderCreateExample();
      } else {
        console.log('Game : START : ------- CASE : CreateExample/Name -----> renderMessageAfterAction'); 
        return this.renderMessageAfterAction();
      }
    } else if (this.state.action === Util.ACTION_PLAY) {
      if (name === '') {
        console.log('Game : START : ------- CASE : Play/NoName -----> renderPlay');
        return this.renderPlay();
      } else {
        console.log('Game : START : ------- CASE : Play/Name -----> renderPlayWithName');
        return this.renderPlayWithName();
      }
    } else if (this.state.action === Util.ACTION_UPDATE) {
      if (name === '') {
        // name to be chosen
        console.log('Game : START : ------- CASE : Update/NoName -----> renderUpdate'); 
        return this.renderUpdate();
      } else {
        console.log('Game : START : ------- CASE : Update/Name -----> renderUpdateWithName'); 
        return this.renderUpdateWithName();
      }
    } else if (this.state.action === Util.ACTION_EXPORT) {
      if (name === '') {
        // name to be chosen
        console.log('Game : START : ------- CASE : Export/NoName -----> renderExport'); 
        return this.renderExport();
      } else {
        console.log('Game : START : ------- CASE : Export/Name -----> renderExportWithName'); 
        return this.renderExportWithName();
      }
    } else if (this.state.action === Util.ACTION_IMPORT) {

      console.log('Game : START : ------- CASE : Import -----> renderImport'); 
      return this.renderImport();
       
    } else if (action === Util.ACTION_DELETE) {
      if (name === '') {
        console.log('Game : START : ------- CASE : Delete/NoName -----> renderDelete');
        return this.renderDelete();
      } else {
        console.log('Game : START : ------- CASE : Delete/Name -----> renderMessageAfterAction');
        return this.renderMessageAfterAction();
      }
    } else if (this.state.action === Util.ACTION_CLEAR) {

      console.log('Game : START : ------- CASE : Clear -----> renderInit');
      return this.renderInit();   

    } else {
      console.log('Game : START : ------- CASE : Default -----> renderInit');
      return this.renderInit();        
    }   
    
  }

  
}

export default Game;
