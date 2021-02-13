import React from 'react';
import Action from './action';
import NewName from './newname';
import Name from './name';
import Size from './size';
import * as Util from './util';

function Init(props) {

  const renderCreate = (props) => {
    console.log('Init : renderCreate : enter');

    return (
      <div id="cw-init-cont" 
      className="cw-cont" 
      > 
        <Action                
          selected= { props.selectedAction }  
          existingNames={ props.existingNames}  
          onChange={ props.onChangeAction }
        />
        <NewName       
          onChange={ props.onChangeNewName }
        />
        <Size   
          selected={ props.selectedSize }   
          onChange={ props.onChangeSize }
        />
      </div>
    )
  }

  const renderCreateExample = (props) => {
    console.log('Init : renderCreateExample : enter');

    return (
      <div id="cw-init-cont" className="cw-cont"> 
        <Action   
          selected= { props.selectedAction }  
          existingNames={ props.existingNames}               
          onChange={ props.onChangeAction }
        />
        <Name    
          existingNames={ props.existingNames}   
          onChange={ props.onChangeName }
        />
      </div>
    );
  }

  const renderDelete = (props) => {
    console.log('Init : renderDelete : enter');

    return (
      <div id="cw-init-cont" className="cw-cont"> 
        <Action   
          selected= { props.selectedAction }  
          existingNames={ props.existingNames}               
          onChange={ props.onChangeAction }
        />
        <Name    
          existingNames={ props.existingNames}   
          onChange={ props.onChangeName }
        />
      </div>
    );
  }

  const renderPlay = (props) => {
    console.log('Init : renderPlay : enter');

    return (
      <div id="cw-init-cont" className="cw-cont"> 
        <Action   
          selected= { props.selectedAction }  
          existingNames={ props.existingNames}               
          onChange={ props.onChangeAction }
        />
        <Name    
          existingNames={ props.existingNames}   
          onChange={ props.onChangeName }
        />
      </div>
    );
  }

  const renderUpdate = (props) => {
    console.log('Init : renderUpdate : enter');

    return (
      <div id="cw-init-cont" className="cw-cont"> 
        <Action   
          selected= { props.selectedAction }  
          existingNames={ props.existingNames}               
          onChange={ props.onChangeAction }
        />
        <Name    
          existingNames={ props.existingNames}   
          onChange={ props.onChangeName }
        />
      </div>
    );
  }

  const renderExport = (props) => {
    console.log('Init : renderExport : enter');

    return (
      <div id="cw-init-cont" className="cw-cont"> 
        <Action   
          selected= { props.selectedAction }  
          existingNames={ props.existingNames}               
          onChange={ props.onChangeAction }
        />
        <Name    
          existingNames={ props.existingNames}   
          onChange={ props.onChangeName }
        />
      </div>
    );
  }

  const renderImport = (props) => {
    console.log('Init : renderImport : enter');

    return (
      <div id="cw-init-cont" className="cw-cont"> 
        <Action   
          selected= { props.selectedAction }  
          existingNames={ props.existingNames}               
          onChange={ props.onChangeAction }
        />
      </div>
    );
  }

  const renderInit = (props) => {
    console.log('Init : renderInit : enter');

    return (
      <div id="cw-init-cont" className="cw-cont"> 
        <Action       
          selected={ props.selectedAction}
          existingNames={ props.existingNames}
          onChange={ props.onChangeAction }
        />
      </div>
    );
  }

  console.log('Init : enter');
  console.log('Init : props : '+JSON.stringify(props));

  let action = props.action;
  let name = '';
  if (props.name != null) {
    name = props.name;
  }
  
  if (action === Util.ACTION_CREATE) {
    return renderCreate(props);
  } else if (action === Util.ACTION_CREATE_EXAMPLE) {
    if (name === '') {
      return renderCreateExample(props);
    } else {
      return renderInit(props);
    }
  } else if (action === Util.ACTION_DELETE) {
    if (name === '') {
      return renderDelete(props);
    } else {
      return renderInit(props);
    }
  } else if (action === Util.ACTION_PLAY) {
    if (name === '') {
      return renderPlay(props);
    } else {
      return renderInit(props);
    }
  } else if (action === Util.ACTION_UPDATE) {
    if (name === '') {
      return renderUpdate(props);
    } else {
      return renderInit(props);
    }
  } else if (action === Util.ACTION_EXPORT) {
    if (name === '') {
      return renderExport(props);
    } else {
      return renderInit(props);
    }
  } else if (action === Util.ACTION_IMPORT) {
    if (name === '') {
      return renderImport(props);
    } else {
      return renderInit(props);
    }
  } else {
    return renderInit(props);
  }
    
}

export default Init;
