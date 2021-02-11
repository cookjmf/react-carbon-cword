import React from 'react';
import * as Util from './util';

import 'carbon-components/css/carbon-components.min.css';
import { TextArea } from 'carbon-components-react';

class ParamDownClues extends React.Component {

  constructor(props) {
    
    super(props);
    this.state = {};
    this.textarea = React.createRef();
  }

  componentDidUpdate() {

    let elem = this.textarea.current;   
    if (elem != null) {
      let cword = this.props.cword;
      if (cword.paramTextareaSelected === Util.TA_DOWN_CLUES) { 
        elem.selectionStart = cword.paramDownCluesStart;
        elem.selectionEnd = cword.paramDownCluesEnd;
        elem.focus();
      }
    } 
  }
  
  render() {
    // console.log('ParamDownClues : render : enter');

    let cword = this.props.cword;

    let size = cword.size;

    let rows = 1 * size;
    let cols = 100;


    let ph = "Enter Down Clues";
    let text = "";
    if (cword.vertClues.length > 0) {

      text = ''+cword.vertClues;

      ph = "";
    } 

  //   <div id="cw-clues-list-down-title" className="cw-clues-list-title">
  //   Down
  // </div>

    return (
      <>
      <div id="cw-clues-list-down" className="cw-clues-param-list-down">

        <div>
          <TextArea id="cw-clues-param-down-text" className="cw-clues-param-text"
          placeholder={ph}
          ref={ this.textarea }
          onChange={(ev) => this.props.onKeyUp(ev)}
          onKeyUp={(ev) => this.props.onKeyUp(ev)}
          value={text}
          labelText="Down"
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

export default ParamDownClues;
