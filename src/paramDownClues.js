import React, { useEffect, createRef } from 'react';
import * as Util from './util';

import 'carbon-components/css/carbon-components.min.css';
import { TextArea } from 'carbon-components-react';

const ParamDownClues = (props) => {

  console.log('ParamDownClues : enter');

  let textarea = createRef();

  useEffect(() => {
    console.log('ParamDownClues : useEffect : enter');
    let elem = textarea.current;   
    if (elem != null) {
      let cword = props.cword;
      if (cword.paramTextareaSelected === Util.TA_DOWN_CLUES) { 
        elem.selectionStart = cword.paramDownCluesStart;
        elem.selectionEnd = cword.paramDownCluesEnd;
        elem.focus();
      }
    } 
  });

  let cword = props.cword;

  let size = cword.size;

  let rows = 1 * size;
  let cols = 100;

  let ph = "Enter Down Clues";
  let text = "";
  if (cword.vertClues.length > 0) {

    text = ''+cword.vertClues;

    ph = "";
  } 

  return (
    <>
    <div id="cw-clues-list-down" className="cw-clues-param-list-down">

      <div>
        <TextArea id="cw-clues-param-down-text" className="cw-clues-param-text"
        placeholder={ph}
        ref={ textarea }
        onChange={(ev) => props.onKeyUp(ev)}
        onKeyUp={(ev) => props.onKeyUp(ev)}
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

export default ParamDownClues;
