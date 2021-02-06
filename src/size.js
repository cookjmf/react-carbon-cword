import React from 'react';
import * as Util from './util';

class Size extends React.Component {

  constructor(props) {
    
    super(props);
    this.state = {};
  }
  
  render() {
    console.log('Size : render : enter');

    console.log('Size : render : props : '+JSON.stringify(this.props));

    let selectedSize = this.props.selected;
    if (selectedSize == null) {
      selectedSize = '';
    }

    // const options = [];

    let sizes = [];
    // sizes.push(Util.SIZE_TITLE);
    for (let i=0; i<Util.SIZES_ALLOWED.length; i++) {
      sizes.push(Util.SIZES_ALLOWED[i]);
    }

    // for (let i=0; i<sizes.length; i++) {
    //   let id = ''+i;
    //   let size = sizes[i];
    //   options.push(<option key={id} value={size}>{size}</option>);
    // }

    const items = [];
    for (let i=0; i<sizes.length; i++) {
      let size = sizes[i];
      let item = {
        id: 'size-'+i,
        text: size,
        value: size,
      }
      items.push(item);
    }

    return (
      <div style={ { "width": 200,  "display": "inline-block", "padding-right": "30px" } }>
        <Dropdown
          name="cwsizes" 
          id="cwsizes"     
          className="cw-init-select"    
          titleText="Size"    
          label={selectedSize}  
          items={items}
          itemToString={(item) => (item ? item.text : '')}
          size="sm"
          onChange={(ev) => this.props.onChange(ev)}
        />
      </div>
    ); 

    // return (
    //   <select value={selectedSize}
    //   name="cwsizes" 
    //   id="cwsizes" 
    //   className="cw-init-select" 
    //   onChange={(ev) => this.props.onChange(ev.target.value)}
    //   >
    //   {options}
    //   </select>
    // );
    
  }

}

export default Size;
