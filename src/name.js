import React from 'react';
import 'carbon-components/css/carbon-components.min.css';
import { Dropdown } from 'carbon-components-react';

class Name extends React.Component {

  constructor(props) {
    
    super(props);
    this.state = {};
  }
  
  render() {
    console.log('Name : render : enter');

    console.log('Name : render : props : '+JSON.stringify(this.props));

    let selectedName = this.props.selected;
    
    if (selectedName == null || selectedName.length === 0) {
      selectedName = 'Select a name ...';
    } 


    let existingNames = this.props.existingNames;
    
    if (existingNames == null) {
      existingNames = [];
    }

    let names = [];
    
    for (let i=0; i<existingNames.length; i++) {
      names.push(existingNames[i]);
    }
    names.sort();

    let selectedItem = null;

    const items = [];
    for (let i=0; i<names.length; i++) {
      let name = names[i];
      let item = {
        id: 'name-'+i,
        text: name,
        value: name,
      }

      if (name === selectedName) {
        selectedItem = item;
      }


      items.push(item);
    }

    return (
      <div style={ { 
        "width": 200,  
        // "display": "inline-block", 
        "paddingRight": "30px" 
        } }>
        <Dropdown
          name="cwnames" 
          id="cwnames"        
          titleText="Name"    
          label={selectedName}
          selectedItem={selectedItem}   
          items={items}
          itemToString={(item) => (item ? item.text : '')}
          size="sm"
          onChange={(ev) => this.props.onChange(ev)}
        />
      </div>
    ); 
    
  }
}

export default Name;
