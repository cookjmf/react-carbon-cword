import React, { useState, useEffect } from 'react';

import Init from './init';
import Message from './message';
import Param from './param';
import Play from './play';

import Cword from './cword';
import MsgMgr from './msgMgr';

import * as Util from './util';

const Game = React.memo((props) => {

  console.log('Initial value : props = '+JSON.stringify(props));
  let msgMgr = new MsgMgr();

  const [updateTimestamp, setUpdateTimestamp] = useState('');
  const [existingNames, setExistingNames] = useState(null);
  const [action, setAction] = useState('');
  const [msg, setMsg] = useState(null);
  const [cword, setCword] = useState(null);
  const [selectedAction, setSelectedAction] = useState('');
  const [selectedSize, setSelectedSize] = useState('');

  console.log('Initial value : updateTimestamp = '+updateTimestamp);
  console.log('Initial value : msg = '+msg);
  console.log('Initial value : selectedAction = '+selectedAction);
  console.log('Initial value : selectedSize = '+selectedSize);

  // Note: replacement for componentDidMount()
  // Note: the empty array prevents endless loop
  // Note: the eslint comment prevents warning about : React Hook useEffect has a missing dependency:
  useEffect(() => {
    storeGetNames();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // on methods
  // CAN CHANGE STATE

  const onChangeAction = (ev) => {

    let selectedItem = ev.selectedItem;
    let newActionId = selectedItem.id;
    let newAction = selectedItem.text;
    let newActionValue = selectedItem.value;

    console.log('Game : START : -------------------------------------------->');
    console.log('Game : START : onChangeAction ----> id : '+newActionId+' --------->');
    console.log('Game : START : onChangeAction ----> text : '+newAction+' --------->');
    console.log('Game : START : onChangeAction ----> value : '+newActionValue+' --------->');
    console.log('Game : START : -------------------------------------------->');

    if (newAction === Util.ACTION_CREATE_EXAMPLE) {
      let names = [];

      for (var [key,val] of Util.EXAMPLE_MAP) {
        console.log(key +'...'+val.length);
        if (!existingNames.includes(key)) {
          names.push(key);
        }
      }
      setAction(newAction);
      setCword(null);
      setExistingNames(names);
      setUpdateTimestamp(Util.newDate() );

    } else if (newAction === Util.ACTION_CLEAR) {

      storeGetNames();

    } else if (newAction === Util.ACTION_IMPORT) {

      let cword = new Cword();

      setAction(newAction);
      setCword(cword);
      setMsg(null);
      setUpdateTimestamp(Util.newDate() );

    } else {

      setAction(newAction);
      setCword(null);
      setMsg(null);
      setUpdateTimestamp(Util.newDate() );

    }   
  }

  const onChangeName = (ev) => {

    let selectedItem = ev.selectedItem;
    let newNameId = selectedItem.id;
    let newName = selectedItem.text;
    let newNameValue = selectedItem.value;

    console.log('Game : START : -------------------------------------------->');
    console.log('Game : START : onChangeName ----> id : '+newNameId+' --------->');
    console.log('Game : START : onChangeName ----> text : '+newName+' --------->');
    console.log('Game : START : onChangeName ----> value : '+newNameValue+' --------->');
    console.log('Game : START : -------------------------------------------->');
     
    if (action === Util.ACTION_DELETE) {
      let cword = new Cword();
      cword.name = newName;

      storeDelete(cword);
    } else if (action === Util.ACTION_CREATE_EXAMPLE) {

      let cwObj = Util.EXAMPLE_MAP.get(newName);
      if (cwObj != null) {    
        let cword = new Cword();
        cword.setupCwordFromStorageObject(cwObj);
    
        storeSave(cword);
      } else {
        console.log("logic error : no example found named : "+newName);
      }
    } else if (action === Util.ACTION_PLAY) {
      storeGet(newName);
    } else if (action === Util.ACTION_UPDATE) {
      storeGet(newName);
    } else if (action === Util.ACTION_EXPORT) {
      storeGet(newName);
    } else if (action === Util.ACTION_IMPORT) {

    } else {
      // other actions here

    }

  }

  const onChangeNewName = (ev) => {

    let target = ev.target;
    let newNameId = ev.id;
    let newName = target.value;

    console.log('Game : START : -------------------------------------------->');
    console.log('Game : START : onChangeNewName ----> id : '+newNameId+' --------->');
    console.log('Game : START : onChangeNewName ----> value : '+newName+' --------->');
    console.log('Game : START : -------------------------------------------->');

    if (action === Util.ACTION_CREATE) {

      let cword = new Cword();
      cword.name = newName;

      setCword(cword);

      if (Util.isExample(newName)) {

        msgMgr.addError('Invalid name, reserved for example');

        setMsg(msgMgr.msg());
        setUpdateTimestamp(Util.newDate() );

      } 
    } else {
      console.log("logic error : in onChangeNewName but action is not CREATE");
    }
  }

  const onChangeSize = (ev) => {

    let selectedItem = ev.selectedItem;
    let newSizeId = selectedItem.id;
    let newSize = selectedItem.text;
    let newSizeValue = selectedItem.value;

    console.log('Game : START : -------------------------------------------->');
    console.log('Game : START : onChangeSize ----> id : '+newSizeId+' --------->');
    console.log('Game : START : onChangeSize ----> text : '+newSize+' --------->');
    console.log('Game : START : onChangeSize ----> value : '+newSizeValue+' --------->');
    console.log('Game : START : -------------------------------------------->');

    cword.init(newSize);

    if (action === Util.ACTION_CREATE) {

      let name = cword.name;
      
      if (!Util.isValidName(name)) {
        msgMgr.addError('Invalid name : '+name);

        setMsg(msgMgr.msg());
        setUpdateTimestamp(Util.newDate() );
  
      } else if (Util.isDuplicateName(existingNames, name)) {
        msgMgr.addError('Duplicate name : '+name);

        setMsg(msgMgr.msg());
        setUpdateTimestamp(Util.newDate() );

      } else {
  
        let cwObj = Util.EXAMPLE_MAP.get(name);
        if (cwObj != null) {    
          console.log('Game : setupNew : example case : not valid here');

        } else {
          console.log('Game : setupNew : non example case');
  
          storeSave(cword);
        }
      }
    
    } else {
      console.log("logic error : in onChangeSize but action is not CREATE");
    }
  }

  const onClickMessageClose = () => {
    console.log('Game : START : -------------------------------------------->');
    console.log('Game : START : onClickMessageClose ------------------------>');
    console.log('Game : START : -------------------------------------------->');  

    msgMgr.clear(); 

    let name = '';
    if (cword != null) {
      name = cword.name;
    }

    if (action === Util.ACTION_CREATE) {
      if (!Util.isValidName(name) || Util.isDuplicateName(existingNames, name)) {
        // force user to choose "Size" again

        setSelectedAction(Util.ACTION_CREATE);
        setSelectedSize('');
        setMsg(null);
        setUpdateTimestamp(Util.newDate() );

      } else {
        storeGetNames();
      }
    } else if (action === Util.ACTION_CREATE_EXAMPLE) {
      storeGetNames();
    } else if (action === Util.ACTION_DELETE) {
      storeGetNames();
    } else if (action === Util.ACTION_EXPORT) {
      storeGetNames();
    } else if (action === Util.ACTION_IMPORT) {

      if (msg != null && msg.errorId === Util.ERROR_INVALID_IMPORT_JSON) {
        // invalid json for import so enable user to update it

        setSelectedAction(Util.ACTION_IMPORT);
        setMsg(null);
        setUpdateTimestamp(Util.newDate() );

      } else {

        setAction(null);
        setCword(null);
        setMsg(null);   

        storeGetNames();
      }
    } else {

      // message displayed before action chosen

      setMsg(null);
      setUpdateTimestamp(Util.newDate() );

    }
  }

  const onClickMessageConfirm = (id) => {
    console.log('Game : START : -------------------------------------------->');
    console.log('Game : START : onClickMessageConfirm -----> '+id+'------------------->');
    console.log('Game : START : -------------------------------------------->');  

    if (id === Util.CONFIRM_VALIDATE) {

      let newMsg = cword.validate();

      setMsg(newMsg);
      setUpdateTimestamp(Util.newDate() );


    } else if (id === Util.CONFIRM_IMPORT) {

      try {
        let value = cword.importJson;
  
        let cwObj = JSON.parse(value);

        let cwordNew = new Cword();

        cwordNew.setupCwordFromStorageObject(cwObj);

        let newMsg = cwordNew.msgMgr.msg();
        
        if (newMsg == null) {

          newMsg = cwordNew.validateForImport();
  
          if (newMsg == null) {
          
            storeSave(cwordNew);
          }
  
        } else {
   
          msg.prefix = 'Failed Validation.';
          msg.errorId = Util.ERROR_INVALID_IMPORT_JSON;

          setMsg(newMsg);
          setUpdateTimestamp(Util.newDate() );
    ;
        }

      } catch (err) {
        msgMgr.addErrorId('Invalid JSON. '+err, '', Util.ERROR_INVALID_IMPORT_JSON);

        setMsg(msgMgr.msg());
        setUpdateTimestamp(Util.newDate() );

      }
    }
  }

  const onClickParamCell = (id) => {

    console.log('Game : START : -------------------------------------------->');
    console.log('Game : START : onClickParamCell ----> '+id+'------------->');
    console.log('Game : START : -------------------------------------------->');  

    cword.toggleParamCell(id);

    storeSave(cword);
  }

  const onKeyUpParamAcrossTextarea = (ev) => {

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

      cword.horizClues = atext;
      cword.paramTextareaSelected = Util.TEXTAREA_ACROSS_CLUES;
      cword.paramAcrossCluesStart = elem.selectionStart;
      cword.paramAcrossCluesEnd = elem.selectionEnd;

      storeSave(cword);

    } else {
      console.log('ignore since not a change');
    }

  }

  const onKeyUpParamDownTextarea = (ev) => {

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

      cword.vertClues = dtext;

      cword.paramTextareaSelected = Util.TEXTAREA_DOWN_CLUES;
      cword.paramDownCluesStart = elem.selectionStart;
      cword.paramDownCluesEnd = elem.selectionEnd;

      storeSave(cword);

    } else {
      console.log('ignore since not a change');
    }

  }

  const onClickPlayCell = (ev) => {

    var elem = ev.currentTarget;
    var id = elem.id;

    console.log('Game : START : -------------------------------------------->');
    console.log('Game : START : onClickPlayCell ----> id: '+id+' ------------->');
    console.log('Game : START : -------------------------------------------->');  

    let newMsg = cword.buildForPlay();

    if (newMsg != null) {

    } else {
      cword.cellClicked(id);

      setMsg(null);
      setCword(cword);
      setUpdateTimestamp(Util.newDate() );

    }
  }

  const onChangePlayCell = (ev) => {

    // changes handled in "onKeyUpPlayCell"
    // react complains if no onChange handler exists

    var elem = ev.currentTarget;
    var id = elem.id;
    var value = elem.value;

    console.log('Game : START : onChangePlayCell ----> id : '+id+' ------------->');
    console.log('Game : START : onChangePlayCell ----> value : '+value+' ------------->');

    
  }

  const onKeyUpPlayCell = (ev) => {

    var elem = ev.currentTarget;
    var id = elem.id;

    console.log('Game : START : -------------------------------------------->');
    console.log('Game : START : onKeyUpPlayCell ----> id : '+id+' ------------->');
    console.log('Game : START : -------------------------------------------->');   

    let value = cword.keyUpPlayCell(ev);

    if (value != null) {
      console.log('Game : got value : ['+value+']');
      cword.cellChanged(id, value);
      storeSave(cword);

    } else {

      setMsg(null);
      setCword(cword);
      setUpdateTimestamp(Util.newDate() );

    }

  }

  const onKeyDownPlayCell = (ev) => {

    var elem = ev.currentTarget;
    var id = elem.id;

    console.log('Game : START : -------------------------------------------->');
    console.log('Game : START : onKeyDownPlayCell ----> id : '+id+' ------------->');
    console.log('Game : START : -------------------------------------------->');  

    let result = cword.keyDownPlayCell(ev);

    setMsg(null);
    setCword(cword);
    setUpdateTimestamp(Util.newDate() );

    return result;
  }

  const onClickAcrossClue = (id) => {

    console.log('Game : START : -------------------------------------------->');
    console.log('Game : START : onClickAcrossClue ----> '+id+'------------->');
    console.log('Game : START : -------------------------------------------->');  

    cword.acrossClueClicked(id);

    setMsg(null);
    setCword(cword);
    setUpdateTimestamp(Util.newDate() );

  }

  const onClickDownClue = (id) => {

    console.log('Game : START : -------------------------------------------->');
    console.log('Game : START : onClickDownClue ----> '+id+'------------->');
    console.log('Game : START : -------------------------------------------->');  

    cword.downClueClicked(id);

    setMsg(null);
    setCword(cword);
    setUpdateTimestamp(Util.newDate() );

  }

  const onKeyUpImportTextarea = (ev) => {

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

      cword.importJson = value;

      cword.paramTextareaSelected = Util.TEXTAREA_IMPORT;
      cword.paramImportStart = elem.selectionStart;
      cword.paramImportEnd = elem.selectionEnd;

      msgMgr.addConfirmInfo('', 'Import', Util.CONFIRM_IMPORT);

      setMsg(msgMgr.msg());
      setCword(cword);
      setUpdateTimestamp(Util.newDate() );

    } else {
      console.log('ignore since not a change');
    }

  }

  // store methods
  // DO NOT CHANGE STATE HERE

  const storeGet = (name) => {
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
        resultGet(cwObj, true, name, null);
      }
    )
    .catch(
      err => {
        console.log('Game : storeGet : catch : err');
        Util.showErr(err);
        resultGet(null, false, name, err);
      }
    ) 
  }
  
  const storeDelete = (cword) => {
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
        resultDelete(true, cword, null);
      }
    )
    .catch(
      err => {

        console.log('Game : storeDelete : catch : err');
        Util.showErr(err);
        resultDelete(false, cword, err);
      }
    ) 
  }

  const storeSave = (cwObj) => {
    console.log('Game : storeSave : enter');
  
    // for play and update - assume the cword exists
    // for other cases, (new, new-example, import) check first

    if (action === Util.ACTION_PLAY || action === Util.ACTION_UPDATE) {
      storeUpdate(cwObj);
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
            storeUpdate(cwObj);
          } else {
            storeInsert(cwObj);
          }
        }
      )
      .catch(
        err => {

          console.log('Game : storeSave : catch : err');
          Util.showErr(err);

          resultSave(cwObj, false, err);
        }
      ) 
    }  
  }

  const storeInsert = (cwObj) => {
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
        resultInsert(cwObj, true, null);
      }
    )
    .catch(
      err => {
        console.log('Game : storeInsert : catch : err');
        Util.showErr(err);
        resultInsert(cwObj, false, err);
      }
    )  
  }
  
  const storeUpdate = (cwObj) => {
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
        resultUpdate(cwObj, true, null);
      }
    )
    .catch(
      err => {
        console.log('Game : storeUpdate : catch : err');
        Util.showErr(err);
        resultUpdate(cwObj, false, err);
      }
    )  
  }
  
  const storeGetNames = () => {
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
          resultGetNames(true, names, null);
          
        }
      )
      .catch(
        err => {

          console.log('Game : storeGetNames : catch : err');
          Util.showErr(err);

          resultGetNames(false, [], err);

        }
      )
  }

  // result methods, called:
  // - after store methods 
  // - set the updateTimestamp here, which forces re-render
  // CAN CHANGE STATE  

  const resultGetNames = (ok, names, err) => {
    console.log('Game : resultGetNames : enter');
    if (!ok) {
      msgMgr.addError('Failed to get crossword names. '+err);
      let newMsg = msgMgr.msg();

      setAction('');
      setExistingNames(names);  
      setCword(null);
      setMsg(newMsg);
      setUpdateTimestamp(Util.newDate() );

    } else {

      setAction('');
      setExistingNames(names);  
      setCword(null);
      setMsg(null);
      setUpdateTimestamp(Util.newDate() );

    }

  }

  const resultSave = (cwObj, ok, err) => {
    console.log('Game : resultSave : enter');
    // let action = state.action;
    if (action === Util.ACTION_IMPORT) {
      resultUpdateImport(cwObj, ok, err);
    } else if (action === Util.ACTION_PLAY) {
      resultPlayUpdate(cwObj, ok, err);
    } else if (action === Util.ACTION_CREATE) {
      resultCreateSave(cwObj, ok, err);
    } else if (action === Util.ACTION_UPDATE) {
      resultUpdateSave(cwObj, ok, err);
    }
  }

  const resultUpdate = (cwObj, ok, err) => {
    console.log('Game : resultUpdate : enter');
    // let action = state.action;
    if (action === Util.ACTION_IMPORT) {
      resultUpdateImport(cwObj, ok, err);
    } else if (action === Util.ACTION_PLAY) {
      resultPlayUpdate(cwObj, ok, err);
    } else if (action === Util.ACTION_CREATE) {
      resultCreateUpdate(cwObj, ok, err);
    } else if (action === Util.ACTION_UPDATE) {
      resultUpdateUpdate(cwObj, ok, err);
    }
  }

  const resultInsert = (cwObj, ok, err) => {
    console.log('Game : resultInsert : enter');
    // let action = state.action;
    if (action === Util.ACTION_IMPORT) {
      resultCreateImport(cwObj, ok, err);
    } else if (action === Util.ACTION_PLAY) {
      // not possible
    } else if (action === Util.ACTION_CREATE) {
      resultCreateInsert(cwObj, ok, err);
    } else if (action === Util.ACTION_CREATE_EXAMPLE) {
      resultCreateInsertExample(cwObj, ok, err);
    } else if (action === Util.ACTION_UPDATE) {
      // not possible
    }
  }

  const resultPlayUpdate = (cwObj, ok, err) => {
    console.log('Game : resultPlayUpdate : enter');
    let name = cwObj.name;
    if (!ok) {
      msgMgr.addError('Failed to save crossword : '+name+' . '+err);
    } 
    let newMsg = msgMgr.msg();

    setCword(cwObj);
    setMsg(newMsg);
    setUpdateTimestamp(Util.newDate() );

  }

  const resultCreateUpdate = (cwObj, ok, err) => {
    console.log('Game : resultCreateUpdate : enter');
    let name = cwObj.name;
    if (!ok) {
      msgMgr.addError('Failed to save crossword : '+name+' . '+err);
    } else {
      msgMgr.addConfirmInfo( 'Saved crossword : '+name+' at '+Util.date1(), "Validate" , Util.CONFIRM_VALIDATE);
    }

    let newMsg = msgMgr.msg();
    
    setCword(cwObj);
    setMsg(newMsg);
    setUpdateTimestamp(Util.newDate() );

  }

  const resultCreateImport = (cwObj, ok, err) => {
    console.log('Game : resultCreateImport : enter');
    let name = cwObj.name;
    if (!ok) {
      msgMgr.addError('Failed to save crossword : '+name+' . '+err);
    } else {
      msgMgr.addInfo( 'Saved crossword : '+name+' at '+Util.date1(), "Validate" , Util.CONFIRM_VALIDATE);
    }
    let newMsg = msgMgr.msg();

    let newExistingNames = Util.addIfNotIncludes(existingNames, cwObj.name);

    setExistingNames(newExistingNames);
    setCword(cwObj);
    setMsg(newMsg);
    setUpdateTimestamp(Util.newDate() );

  }

  const resultUpdateImport = (cwObj, ok, err) => {
    console.log('Game : resultUpdateImport : enter');
    let name = cwObj.name;
    if (!ok) {
      msgMgr.addError('Failed to save crossword : '+name+' . '+err);
    } else {
      msgMgr.addInfo( 'Saved crossword : '+name+' at '+Util.date1(), "Validate" , Util.CONFIRM_VALIDATE);
    }
    let newMsg = msgMgr.msg();

    setCword(cwObj);
    setMsg(newMsg);
    setUpdateTimestamp(Util.newDate() );

  }

  const resultUpdateUpdate = (cwObj, ok, err) => {
    console.log('Game : resultUpdateUpdate : enter');
    let name = cwObj.name;
    if (!ok) {
      msgMgr.addError('Failed to save crossword : '+name+' . '+err);
    } else {
      msgMgr.addConfirmInfo( 'Updated crossword : '+name+' at '+Util.date1(), "Validate" ,Util.CONFIRM_VALIDATE);
    }
    let newMsg = msgMgr.msg();

    setCword(cwObj);
    setMsg(newMsg);
    setUpdateTimestamp(Util.newDate() );

  }

  const resultCreateInsert = (cwObj, ok, err) => {
    console.log('Game : resultCreateInsert : enter');
    let name = cwObj.name;
    if (!ok) {
      msgMgr.addError('Failed to save crossword : '+name+'. ' +err);
      
    } else {
      msgMgr.addInfo('Created crossword : '+name+', now set blanks and clues');  
      
    }
    let newMsg = msgMgr.msg();
    let newExistingNames = Util.addIfNotIncludes(existingNames, name);

    setExistingNames(newExistingNames);
    setCword(cwObj);
    setMsg(newMsg);
    setUpdateTimestamp(Util.newDate() );

  }

  const resultCreateInsertExample = (cwObj, ok, err) => {
    console.log('Game : resultCreateInsertExample : enter');
    let name = cwObj.name;
    if (!ok) {
      
      msgMgr.addError('Failed to save example crossword : '+name+'. ' +err);
    } else {
      
      msgMgr.addInfo('Created example crossword : '+name+'.');
    }
    let newMsg = msgMgr.msg();
    let newExistingNames = Util.addIfNotIncludes(existingNames, name);


    setExistingNames(newExistingNames);
    setCword(cwObj);
    setMsg(newMsg);
    setUpdateTimestamp(Util.newDate() );

  }

  const resultCreateSave = (cwObj, ok, err) => {
    console.log('Game : resultCreateSave : enter');
    let name = '?';
    if (cwObj != null) {
      name = cwObj.name;
    }
    if (!ok) {
      msgMgr.addError('Failed to save crossword : '+name+'. '+err);
    } else {
      // should not happen
    }
    let newMsg = msgMgr.msg();

    setMsg(newMsg);
    setUpdateTimestamp(Util.newDate() );

  }

  const resultUpdateSave = (cwObj, ok, err) => {
    console.log('Game : resultUpdateSave : enter');
    let name = '?';
    if (cwObj != null) {
      name = cwObj.name;
    }
    if (!ok) {
      msgMgr.addError('Failed to save crossword : '+name+'. '+err);
    } else {
      // should not happen
    }
    let newMsg = msgMgr.msg();

    setMsg(newMsg);
    setUpdateTimestamp(Util.newDate() );

  }

  const resultGet = (cwObj, ok, name, err) => {
    console.log('Game : resultGet : enter');

    if (!ok) {
      msgMgr.addError('Failed to get crossword : '+name+'. '+err);
      let newMsg = msgMgr.msg();

      setMsg(newMsg);
      setUpdateTimestamp(Util.newDate() );

    } else {
      let cword = new Cword();
      cword.setupCwordFromStorageObject(cwObj);

      let newMsg = null;
      if (action === Util.ACTION_PLAY) {
        newMsg = cword.buildForPlay();
      } else if (action === Util.ACTION_UPDATE) {
        newMsg = cword.buildForUpdate();
      } else if (action === Util.ACTION_EXPORT) {
        msgMgr.addInfo('Copy this text and save for future import');
        newMsg = msgMgr.msg();
      }

      setMsg(newMsg);
      setCword(cword);
      setUpdateTimestamp(Util.newDate() );
  
    }
  }

  const resultDelete = (deletedOK, cword, err) => {
    console.log('Game : resultDelete : enter');
    let name = cword.name;
    if (!deletedOK) {
      msgMgr.addError('Failed to delete crossword : '+name+'. '+err);
    } else {
      msgMgr.addInfo('Deleted crossword : '+name);
    }
    let newMsg = msgMgr.msg();

    setMsg(newMsg);
    setCword(cword);
    setUpdateTimestamp(Util.newDate() );

  }

  // render methods
  // NEVER CHANGE STATE HERE
 
  const renderCreate = () => {
    // chose create, show name, size
    console.log('Game : renderCreate : enter');

    return (
      <div className="game">   
        <Init 
          action={ action}
          selectedAction={Util.ACTION_CREATE}         
          selectedName={Util.NAME_TITLE}       
          existingNames={ existingNames }
          
          onChangeAction={ onChangeAction }
          onChangeName={ onChangeName }
          onChangeNewName={ onChangeNewName }
          onChangeSize={ onChangeSize }
        /> 
        <Message         
          msg={ msg }
          onClickMessageClose={ onClickMessageClose }
        />       
      </div>
    );
  }

  const renderCreateExample = () => {
    // chose create, show name
    console.log('Game : renderCreateExample : enter');

    return (
      <div className="game">   
        <Init 
          action={ action}
          selectedAction={Util.ACTION_CREATE_EXAMPLE}         
          selectedName={Util.NAME_TITLE}       
          onChangeAction={ onChangeAction }
          onChangeName={ onChangeName }
          existingNames={ existingNames }
        /> 
        <Message         
          msg={ msg }
          onClickMessageClose={ onClickMessageClose }
        />       
      </div>
    );
  }

  const renderCreateWithName = () => {
    // chose create, entered name, get size
    console.log('Game : renderCreateWithName : enter');

    return (
      <div className="game">   
        <Init 
          action={ action}
          selectedAction={Util.ACTION_CREATE}
          name={ cword.name}
          selectedName={cword.name}
          size={ cword.size}
          selectedSize=''
          onChangeAction={ onChangeAction }
          onChangeName={ onChangeName }
          onChangeNewName={ onChangeNewName }
          onChangeSize={ onChangeSize }
        /> 
        <Message         
          msg={ msg }
          onClickMessageClose={ onClickMessageClose }
        />       
      </div>
    );
  }

  const renderSetupNew = () => {
    // chose create, entered name, chose size
    console.log('Game : renderSetupNew : enter');

    return (
      <div className="game"> 
        <Init 
          action=''
          selectedAction=''
          selectedSize={ cword.size }
          existingNames={ existingNames }
          onChangeAction={ onChangeAction }
        />
        <Message         
          msg={ msg }
          onClickMessageClose={ onClickMessageClose }
          onClickMessageConfirm={ onClickMessageConfirm }
        /> 
        <Param
          action= { action }
          cword={ cword}
          onClickParamCell={ onClickParamCell }
          onKeyUpParamAcrossTextarea={ onKeyUpParamAcrossTextarea }
          onKeyUpParamDownTextarea={ onKeyUpParamDownTextarea }
        />
      </div>
    );
  }

  const renderUpdateWithName = () => {
    // chose update, entered name
    console.log('Game : renderUpdateWithName : enter');

    return (
      <div className="game"> 
        <Init 
          action=''
          
          selectedSize={ cword.size }
          existingNames={ existingNames }
          onChangeAction={ onChangeAction }
        />
        <Message         
          msg={ msg }
          onClickMessageClose={ onClickMessageClose }
          onClickMessageConfirm={ onClickMessageConfirm }
        /> 
        <Param
          action= { action }
          cword={ cword}
          onClickParamCell={ onClickParamCell }
          onKeyUpParamAcrossTextarea={ onKeyUpParamAcrossTextarea }
          onKeyUpParamDownTextarea={ onKeyUpParamDownTextarea }
        />
      </div>
    );
  }

  const renderExportWithName = () => {
    // chose export, entered name
    console.log('Game : renderExportWithName : enter');

    return (
      <div className="game"> 
        <Init 
          action=''
          
          selectedSize={ cword.size }
          existingNames={ existingNames }
          onChangeAction={ onChangeAction }
        />
        <Message         
          msg={ msg }
          onClickMessageClose={ onClickMessageClose }
          onClickMessageConfirm={ onClickMessageConfirm }
        /> 
        <Param
          action= { action }
          cword={ cword}
        />
      </div>
    );
  }

  const renderPlayWithName = () => {
    // chose play and name
    console.log('Game : renderPlayWithName : enter');

    return (
      <div className="game"> 
        <Init 
          action=''        
          existingNames={ existingNames }
          onChangeAction={ onChangeAction }
        />
        <Message 
          className="cw-message"        
          msg={ msg }
          onClickMessageClose={ onClickMessageClose }
          onClickMessageConfirm={ onClickMessageConfirm }
        /> 
        <Play
          cword={ cword }
          updateTimestamp={ updateTimestamp }
          onClickPlayCell={ onClickPlayCell }
          onChangePlayCell={ onChangePlayCell }
          onKeyUpPlayCell={ onKeyUpPlayCell }
          onKeyDownPlayCell={ onKeyDownPlayCell }
          onClickAcrossClue={ onClickAcrossClue }
          onClickDownClue={ onClickDownClue }
        />
      </div>
    );
  }

  const renderPlay = () => {
    // chose play
    console.log('Game : renderPlay : enter');

    return (
      <div className="game"> 
        <Init 
          action={ action}
          selectedAction={Util.ACTION_PLAY}
          existingNames={ existingNames }
          onChangeName={ onChangeName }
          onChangeAction={ onChangeAction }
        /> 
        <Message         
          msg={ msg }
          onClickMessageClose={ onClickMessageClose }
        />   
      </div>
    );
  }

  const renderDelete = () => {
    // chose delete
    console.log('Game : renderDelete : enter');

    return (
      <div className="game"> 
        <Init 
          action={ action}
          selectedAction={Util.ACTION_DELETE}
          existingNames={ existingNames }
          onChangeName={ onChangeName }
          onChangeAction={ onChangeAction }
        /> 
        <Message         
          msg={ msg }
          onClickMessageClose={ onClickMessageClose }
        />   
      </div>
    );
  }

  const renderUpdate = () => {
    // chose update
    console.log('Game : renderUpdate : enter');

    return (
      <div className="game"> 
        <Init 
          action={ action}
          selectedAction={Util.ACTION_UPDATE}
          existingNames={ existingNames }
          onChangeName={ onChangeName }
          onChangeAction={ onChangeAction }
        /> 
        <Message         
          msg={ msg }
          onClickMessageClose={ onClickMessageClose }
        />   
      </div>
    );
  }

  const renderExport = () => {
    // chose export
    console.log('Game : renderExport : enter');

    return (
      <div className="game"> 
        <Init 
          action={ action}
          selectedAction={Util.ACTION_EXPORT}
          existingNames={ existingNames }
          onChangeName={ onChangeName }
          onChangeAction={ onChangeAction }
        /> 
        <Message         
          msg={ msg }
          onClickMessageClose={ onClickMessageClose }
        />   
      </div>
    );
  }

  const renderImport = () => {
    // chose import
    console.log('Game : renderImport : enter');

    return (
      <div className="game"> 
        <Init 
          action={ action}
          selectedAction={Util.ACTION_IMPORT}
          existingNames={ existingNames }
          onChangeName={ onChangeName }
          onChangeAction={ onChangeAction }
        /> 
        <Message         
          msg={ msg }
          onClickMessageClose={ onClickMessageClose }
          onClickMessageConfirm={ onClickMessageConfirm }
        />   
        <Param
          cword = {cword}
          action= { action }
          onKeyUp={ onKeyUpImportTextarea }
        />
      </div>
    );
  }

  const renderMessageAfterAction = () => {
    // chose delete / createExample
    console.log('Game : renderMessageAfterAction : enter');

    let name = '';
    if (cword != null) {
      name = cword.name;
    }

    return (
      <div className="game"> 
        <Init 
          action={ action}
          
          name={ name}
          existingNames={ existingNames }
          onChangeName={ onChangeName }
          onChangeAction={ onChangeAction }
        /> 
        <Message         
          msg={ msg }
          onClickMessageClose={ onClickMessageClose }
        />   
      </div>
    );
  }

  const renderInit = () => {
    console.log('Game : renderInit : enter');

    return (
      <div className="game">   
        <Init 
          existingNames={ existingNames }
          onChangeAction={ onChangeAction }
        />    
        <Message         
          msg={ msg }
          onClickMessageClose={ onClickMessageClose }
        />      
      </div>
    );
  }

  let name = '';
  let size = '';
  let nameValid = false;
  let nameExists = false;
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
      return renderCreate();
    } else {
      if (size === '') {
        // name has been chosen, size to be chosen
        console.log('Game : START : ------- CASE : Create/Name/NoSize -----> renderCreateWithName'); 
        return renderCreateWithName();
      } else {
        if (!nameValid) {
          console.log('Game : START : ------- CASE : Create/InvalidName/Size -----> renderCreateWithName'); 
          return renderCreateWithName();
        } else if (!nameExists) {
          // name, size has been chosen, name is valid, cword failed to save
          console.log('Game : START : ------- CASE : Create/ValidName/Size/NameNotExists -----> renderCreateWithName'); 
          return renderCreateWithName();
        } else {
          // at this point name exists if the save worked
          // name, size has been chosen, name is valid, cword saved, show message and params
          console.log('Game : START : ------- CASE : Create/ValidName/Size/NameExists -----> renderSetupNew'); 
          return renderSetupNew();
        }
        
      }
    }
  } else if (action === Util.ACTION_CREATE_EXAMPLE) {
    if (name === '') {
      // name to be chosen
      console.log('Game : START : ------- CASE : CreateExample/NoName -----> renderCreateExample'); 
      return renderCreateExample();
    } else {
      console.log('Game : START : ------- CASE : CreateExample/Name -----> renderMessageAfterAction'); 
      return renderMessageAfterAction();
    }
  } else if (action === Util.ACTION_PLAY) {
    if (name === '') {
      console.log('Game : START : ------- CASE : Play/NoName -----> renderPlay');
      return renderPlay();
    } else {
      console.log('Game : START : ------- CASE : Play/Name -----> renderPlayWithName');
      return renderPlayWithName();
    }
  } else if (action === Util.ACTION_UPDATE) {
    if (name === '') {
      // name to be chosen
      console.log('Game : START : ------- CASE : Update/NoName -----> renderUpdate'); 
      return renderUpdate();
    } else {
      console.log('Game : START : ------- CASE : Update/Name -----> renderUpdateWithName'); 
      return renderUpdateWithName();
    }
  } else if (action === Util.ACTION_EXPORT) {
    if (name === '') {
      // name to be chosen
      console.log('Game : START : ------- CASE : Export/NoName -----> renderExport'); 
      return renderExport();
    } else {
      console.log('Game : START : ------- CASE : Export/Name -----> renderExportWithName'); 
      return renderExportWithName();
    }
  } else if (action === Util.ACTION_IMPORT) {

    console.log('Game : START : ------- CASE : Import -----> renderImport'); 
    return renderImport();
      
  } else if (action === Util.ACTION_DELETE) {
    if (name === '') {
      console.log('Game : START : ------- CASE : Delete/NoName -----> renderDelete');
      return renderDelete();
    } else {
      console.log('Game : START : ------- CASE : Delete/Name -----> renderMessageAfterAction');
      return renderMessageAfterAction();
    }
  } else if (action === Util.ACTION_CLEAR) {

    console.log('Game : START : ------- CASE : Clear -----> renderInit');
    return renderInit();   

  } else {
    console.log('Game : START : ------- CASE : Default -----> renderInit');
    return renderInit();        
  }   

});

export default Game;

