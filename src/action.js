import React from 'react';
import * as Util from './util';

import 'carbon-components/css/carbon-components.min.css';
import { Dropdown } from 'carbon-components-react';

function Action(props) {

  console.log('Action : enter');

  console.log('Action : props : '+JSON.stringify(props));

  let numNames = 0;
  if (props.existingNames!=null) {
    numNames = props.existingNames.length;
  }
  var actionNames = [];
  if (numNames > 0) {
    actionNames = [
      Util.ACTION_CREATE, Util.ACTION_CREATE_EXAMPLE, 
      Util.ACTION_PLAY, Util.ACTION_UPDATE, Util.ACTION_EXPORT, Util.ACTION_IMPORT, 
      Util.ACTION_DELETE, Util.ACTION_CLEAR];
  } else {
    actionNames = [
      Util.ACTION_CREATE, Util.ACTION_CREATE_EXAMPLE, 
      Util.ACTION_IMPORT, Util.ACTION_CLEAR];
  }

  let selectedAction = props.selected;
  
  if (selectedAction == null || selectedAction.length === 0) {
    selectedAction = 'Select an action ...';
  } 

  let selectedItem = null;
  const items = [];
  for (let i=0; i<actionNames.length; i++) {
    let actionName = actionNames[i];
    
    let item = {
      id: 'action-'+i,
      text: actionName,
      value: actionName,
    }

    if (actionName === selectedAction) {
      selectedItem = item;
    }

    items.push(item);
  }

  return (
    <div className="cw-dropdown-container"
      >
      <Dropdown
        name="cw-actions" 
        id="cw-actions"        
        titleText="Action"
        label={selectedAction}
        selectedItem={selectedItem}
        items={items}
        itemToString={(item) => (item ? item.text : '')}
        size="sm"
        onChange={(ev) => props.onChange(ev)}
      />
    </div>
  ); 
  
}

export default Action;
