import React from 'react';
import * as Util from './util';

import 'carbon-components/css/carbon-components.min.css';
import { Dropdown } from 'carbon-components-react';

class Size extends React.Component {

  constructor(props) {
    
    super(props);
    this.state = {};
  }
  
  render() {
    console.log('Size : render : enter');

    console.log('Size : render : props : '+JSON.stringify(this.props));

    let selectedSize = this.props.selected;
    
    if (selectedSize == null || selectedSize.length === 0) {
      selectedSize = 'Select a size ...';
    } 

    let sizes = [];
    // sizes.push(Util.SIZE_TITLE);
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
      <div 
      // className='size-container'
      style={ {  
        // "height": 80, 
        "width": 200,  
         // "display": "inline-block", 
         "paddingRight": "30px", 
         // "background-color": "pink" 
       } }
      >
        <Dropdown
          name="cwsizes" 
          id="cwsizes"     
          className="cw-init-select"    
          titleText="Size"    
          label={selectedSize}  
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

export default Size;
