import React, { useEffect, createRef } from 'react';

import ParamBoard from './paramBoard';
import ParamAcrossClues from './paramAcrossClues';
import ParamDownClues from './paramDownClues';
import * as Util from './util';

const Param = (props) => {

  console.log('Param : enter');

  let textarea = createRef();

  useEffect(() => {
    console.log('Param : useEffect : enter');
    let elem = textarea.current;   
    if (elem != null) {
      let cword = props.cword;

      console.log('paramTextareaSelected = '+cword.paramTextareaSelected);
      console.log('paramImportStart = '+cword.paramImportStart);
      console.log('paramImportEnd = '+cword.paramImportEnd);

      if (cword.paramTextareaSelected === Util.TA_IMPORT) { 
        elem.selectionStart = cword.paramImportStart;
        elem.selectionEnd = cword.paramImportEnd;
        elem.focus();
      }
    } 
  });

  let action = props.action;
  let cword = props.cword;

  if (action === Util.ACTION_IMPORT) { 

    console.log('importJson = '+cword.importJson);
    console.log('paramTextareaSelected = '+cword.paramTextareaSelected);
    console.log('paramImportStart = '+cword.paramImportStart);
    console.log('paramImportEnd = '+cword.paramImportEnd);

    let ph = "Enter JSON";
    let text = "";
    if (cword.importJson.length > 0) {
      text = ''+cword.importJson; 
      ph = "";
    } 

    return (
      <div id="cw-params-cont" className="cw-params-cont">
        <textarea id="cw-export-text" className="cw-export-import-text"           
          placeholder={ph}
          value={text}
          ref={ textarea }
          onKeyUp={(ev) => props.onKeyUp(ev)}
          onChange={(ev) => props.onKeyUp(ev)}
          >
        </textarea>
      </div>
    );
    
  } 

  if (action === Util.ACTION_EXPORT) {  
    let cwObj = cword.getStorageObject();
    let cwordText = JSON.stringify(cwObj);

    return (
      <div id="cw-params-cont" className="cw-params-cont">
        <textarea id="cw-export-text" className="cw-export-import-text"
          value={cwordText} readOnly
          >
        </textarea>
      </div>
    );
  
  } 

  let size = cword.size;

  let na = Util.numberedMaxAcross(size);
  let nd = Util.numberedMaxDown(size);

  let suffix = na+'by'+nd;
  let boardClassName = 'cw-board-'+suffix;
  let cluesClassName = 'cw-clues-'+suffix;

  return (
    <div id="cw-params-cont" className="cw-params-cont">
      <div id="cw-params-board" className={boardClassName}>
        <ParamBoard
          cword={ cword}
          onClickParamCell={ props.onClickParamCell }
        >
        </ParamBoard>
        <div id="cw-param-clues" className={cluesClassName}>
          <a className="cw-clues-info" href={Util.OCR_ONLINE_URL}
          target = "_blank" rel="noreferrer">
            Parse clues using OnlineOCR
          </a>
          <ParamAcrossClues
            cword={ cword} 
            onKeyUp={ props.onKeyUpParamAcrossTextarea }
          >         
          </ParamAcrossClues>
          <ParamDownClues
            cword={ cword} 
            onKeyUp={ props.onKeyUpParamDownTextarea }
          >
          </ParamDownClues>
        </div>
      </div>
    </div>
  );
}

export default Param;
