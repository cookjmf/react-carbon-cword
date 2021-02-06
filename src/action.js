import React from 'react';
import * as Util from './util';

import 'carbon-components/css/carbon-components.min.css';
import { Dropdown } from 'carbon-components-react';

class Action extends React.Component {

  constructor(props) {   
    super(props);
    this.state = {};
  }

  render() {
    console.log('Action : render : enter');

    console.log('Action : render : props : '+JSON.stringify(this.props));

    let numNames = 0;
    if (this.props.existingNames!=null) {
      numNames = this.props.existingNames.length;
    }
    var actionNames = [];
    if (numNames > 0) {
      actionNames = [
        // Util.ACTION_TITLE,
        Util.ACTION_CREATE, Util.ACTION_CREATE_EXAMPLE, 
        Util.ACTION_PLAY, Util.ACTION_UPDATE, Util.ACTION_EXPORT, Util.ACTION_IMPORT, 
        Util.ACTION_DELETE, Util.ACTION_CLEAR];
    } else {
      actionNames = [
        // Util.ACTION_TITLE,
        Util.ACTION_CREATE, Util.ACTION_CREATE_EXAMPLE, 
        Util.ACTION_IMPORT, Util.ACTION_CLEAR];
    }

    let selectedAction = this.props.selected;
    if (selectedAction == null) {
      selectedAction = '';
    }

    const items = [];
    for (let i=0; i<actionNames.length; i++) {
      let actionName = actionNames[i];
      let item = {
        id: 'action-'+i,
        text: actionName,
        value: actionName,
      }
      items.push(item);
    }

    return (
      <div style={ { "width": 200,  "display": "inline-block", "padding-right": "30px" } }>
        <Dropdown
          name="cwactions" 
          id="cwactions"        
          titleText="Action"
          label={selectedAction}
          items={items}
          itemToString={(item) => (item ? item.text : '')}
          size="sm"
          onChange={(ev) => this.props.onChange(ev)}
        />
      </div>
    ); 
  }
}

export default Action;
