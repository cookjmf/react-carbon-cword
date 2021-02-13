import React from 'react';
import 'carbon-components/css/carbon-components.min.css';
import { TextInput } from 'carbon-components-react';

const NewName = (props) => {

  console.log('NewName : enter');

  return (
    <div className="cw-dropdown-container"
    >
      <TextInput
        name="cwnewname" 
        id="cwnewname"    
        labelText="Name"
        size="sm"
        placeholder="Enter name"
        onChange={(ev) => props.onChange(ev)}
      />
    </div>
  );
    
}

export default NewName;
