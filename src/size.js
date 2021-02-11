import React from 'react';
import * as Util from './util';

import 'carbon-components/css/carbon-components.min.css';
import { Dropdown } from 'carbon-components-react';

function Size(props) {

  console.log('Size : enter');

  console.log('Size : props : '+JSON.stringify(props));

  let selectedSize = props.selected;
  
  if (selectedSize == null || selectedSize.length === 0) {
    selectedSize = 'Select a size ...';
  } 

  let sizes = [];
  for (let i=0; i<Util.SIZES_ALLOWED.length; i++) {
    sizes.push(Util.SIZES_ALLOWED[i]);
  }

  const items = [];
  let selectedItem = null;
  for (let i=0; i<sizes.length; i++) {
    let size = sizes[i];
    let item = {
      id: 'size-'+i,
      text: size,
      value: size,
    }

    if (size === selectedSize) {
      selectedItem = item;
    }

    items.push(item);
  }

  return (
    <div className="cw-dropdown-container"
    >
      <Dropdown
        name="cw-sizes" 
        id="cw-sizes"     
        className="cw-init-select"    
        titleText="Size"    
        label={selectedSize}  
        selectedItem={selectedItem}
        items={items}
        itemToString={(item) => (item ? item.text : '')}
        size="sm"
        onChange={(ev) => props.onChange(ev)}
      />
    </div>
  ); 
  
}

export default Size;
