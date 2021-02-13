import React from 'react';
import Action from './action';
import NewName from './newname';
import Name from './name';
import Size from './size';
import * as Util from './util';

const Init = (props) => {

  console.log('Init : enter');
  console.log('Init : props : '+JSON.stringify(props));

  const renderCreate = () => {
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

  const renderCreateExample = () => {
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

  const renderDelete = () => {
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

  const renderPlay = () => {
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

  const renderUpdate = () => {
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

  const renderExport = () => {
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

  const renderImport = () => {
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

  const renderInit = () => {
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



  let action = props.action;
  let name = '';
  if (props.name != null) {
    name = props.name;
  }
  
  if (action === Util.ACTION_CREATE) {
    return renderCreate();
  } else if (action === Util.ACTION_CREATE_EXAMPLE) {
    if (name === '') {
      return renderCreateExample();
    } else {
      return renderInit();
    }
  } else if (action === Util.ACTION_DELETE) {
    if (name === '') {
      return renderDelete();
    } else {
      return renderInit();
    }
  } else if (action === Util.ACTION_PLAY) {
    if (name === '') {
      return renderPlay();
    } else {
      return renderInit();
    }
  } else if (action === Util.ACTION_UPDATE) {
    if (name === '') {
      return renderUpdate();
    } else {
      return renderInit();
    }
  } else if (action === Util.ACTION_EXPORT) {
    if (name === '') {
      return renderExport();
    } else {
      return renderInit();
    }
  } else if (action === Util.ACTION_IMPORT) {
    if (name === '') {
      return renderImport();
    } else {
      return renderInit();
    }
  } else {
    return renderInit();
  }
    
}

export default Init;
