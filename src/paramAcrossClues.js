import React from 'react';
import * as Util from './util';

import 'carbon-components/css/carbon-components.min.css';
import { TextArea } from 'carbon-components-react';

class ParamAcrossClues extends React.Component {

  constructor(props) {
    
    super(props);
    this.state = {};
    this.textarea = React.createRef();
  }

  componentDidUpdate() {
    console.log('ParamAcrossClues : componentDidUpdate : enter');
    //  https://stackoverflow.com/questions/53782804/how-to-set-cursor-position-inside-textarea-in-reactjs
    let elem = this.textarea.current;   
    if (elem != null) {
      let cword = this.props.cword;

      console.log('paramTextareaSelected = '+cword.paramTextareaSelected);
      console.log('paramAcrossCluesStart = '+cword.paramAcrossCluesStart);
      console.log('paramAcrossCluesEnd = '+cword.paramAcrossCluesEnd);

      if (cword.paramTextareaSelected === Util.TA_ACROSS_CLUES) { 
        elem.selectionStart = cword.paramAcrossCluesStart;
        elem.selectionEnd = cword.paramAcrossCluesEnd;
        elem.focus();
      }
    } 
  }
  
  render() {
    console.log('ParamAcrossClues : render : enter');

    let cword = this.props.cword;

    let size = cword.size;

    let rows = 1 * size;
    let cols = 100;

    console.log('horizClues = '+cword.horizClues);
    console.log('paramTextareaSelected = '+cword.paramTextareaSelected);
    console.log('paramAcrossCluesStart = '+cword.paramAcrossCluesStart);
    console.log('paramAcrossCluesEnd = '+cword.paramAcrossCluesEnd);

    let ph = "Enter Across Clues";
    let text = "";
    if (cword.horizClues.length > 0) {
      text = ''+cword.horizClues; 
      ph = "";
    } 

  //   <div id="cw-clues-list-across-title" className="cw-clues-list-title">
  //   Across
  // </div>

    return (
      <>
      <div id="cw-clues-list-across" className="cw-clues-param-list-across">

        <div >
          <TextArea id="cw-clues-param-across-text" className="cw-clues-param-text"
          placeholder={ph}
          ref={ this.textarea }
          onKeyUp={(ev) => this.props.onKeyUp(ev)}
          onChange={(ev) => this.props.onKeyUp(ev)}
          value={text}
          labelText="Across"
          rows={rows}
          cols={cols}
          >
          </TextArea>
        </div>
      </div>
      </>
    );
  }

}

export default ParamAcrossClues;
