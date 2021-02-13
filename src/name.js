import React from 'react';
import 'carbon-components/css/carbon-components.min.css';
import { Dropdown } from 'carbon-components-react';

// function Name(props) {
const Name = (props) => {

  console.log('Name : enter');

  console.log('Name : props : '+JSON.stringify(props));

  let selectedName = props.selected;
  
  if (selectedName == null || selectedName.length === 0) {
    selectedName = 'Select a name ...';
  } 


  let existingNames = props.existingNames;
  
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
    <div className="cw-dropdown-container"
      >
      <Dropdown
        name="cw-names" 
        id="cw-names"        
        titleText="Name"    
        label={selectedName}
        selectedItem={selectedItem}   
        items={items}
        itemToString={(item) => (item ? item.text : '')}
        size="sm"
        onChange={(ev) => props.onChange(ev)}
      />
    </div>
  ); 
    
  
}

export default Name;
