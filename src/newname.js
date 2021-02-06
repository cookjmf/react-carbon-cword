import React from 'react';
import 'carbon-components/css/carbon-components.min.css';
import { TextInput } from 'carbon-components-react';

class NewName extends React.Component {

  constructor(props) {
    
    super(props);
    this.state = {};
  }
  
  render() {
    console.log('NewName : render : enter');

    //           className="cw-init-input"  
    return (
      <div 
      // className="name-container"
      style={ { 
        // "height": 80,
        "width": 250,  
      // "display": "inline-block", 
        "paddingRight": "30px", 
      // "background-color": "yellow"
      } }
      >
        {/* <label> fff</label> */}
        <TextInput
          name="cwnewname" 
          id="cwnewname"    
          labelText="Name"
          size="sm"
          placeholder="Enter name"
          onChange={(ev) => this.props.onChange(ev)}
        />
      </div>
    );

    // return (
    //   <input
    //   name="cwnewname" 
    //   id="cwnewname" 
    //   className="cw-init-input" 
    //   placeholder={Util.NAME_PLACEHOLDER}
    //   onChange={(ev) => this.props.onChange(ev.target.value)}
    //   >
    //   </input>
    // );
    
  }

}

export default NewName;
