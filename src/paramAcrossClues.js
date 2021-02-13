import React, { useEffect, createRef } from 'react';

import * as Util from './util';

import 'carbon-components/css/carbon-components.min.css';
import { TextArea } from 'carbon-components-react';

const ParamAcrossClues = (props) => {

  console.log('ParamAcrossClues : enter');

  let textarea = createRef();

  useEffect(() => {
    console.log('ParamAcrossClues : useEffect : enter');
    let elem = textarea.current;   
    if (elem != null) {
      let cword = props.cword;

      console.log('paramTextareaSelected = '+cword.paramTextareaSelected);
      console.log('paramAcrossCluesStart = '+cword.paramAcrossCluesStart);
      console.log('paramAcrossCluesEnd = '+cword.paramAcrossCluesEnd);

      if (cword.paramTextareaSelected === Util.TA_ACROSS_CLUES) { 
        elem.selectionStart = cword.paramAcrossCluesStart;
        elem.selectionEnd = cword.paramAcrossCluesEnd;
        elem.focus();
      }
    } 
  });

  let cword = props.cword;

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

  return (
    <>
    <div id="cw-clues-list-across" className="cw-clues-param-list-across">

      <div >
        <TextArea id="cw-clues-param-across-text" className="cw-clues-param-text"
        placeholder={ph}
        ref={ textarea }
        onKeyUp={(ev) => props.onKeyUp(ev)}
        onChange={(ev) => props.onKeyUp(ev)}
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

export default ParamAcrossClues;
