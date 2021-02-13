import React, { useEffect, createRef } from 'react';

import * as Util from './util';

const PlayCell = (props) => {

  let textInput = createRef();

  useEffect(() => {
    let elem = textInput.current;   
    if (elem != null) {
      let boardArrayKey = props.boardArrayKey;
      let y = Util.row(boardArrayKey);
      let x = Util.column(boardArrayKey);
      let xVal = x-1;
      let yVal = y-1; 
      let cellKey = Util.cellKey(yVal,xVal);
      let cword = props.cword;
      let cellMap = cword.cellMap;
      let cell = cellMap.get(cellKey);
      if (cword.isSelectedCell(cell)) { 
        elem.focus();
      } 
    } 
  });

  const renderNumber = (id, cls, val) => {
    return (
      <>
        <div id={id} className={cls} name={id} key={id} readOnly>
          {val}
        </div>
      </>
    );
  }

  const renderNormalCell = (id, cell, updateTimestamp, onClick, onChange, onKeyUp, onKeyDown) => {
  
    let val = cell.value;
   
    // used to stop auto-complete
    let name = id+"-"+updateTimestamp;
  
    return (
      <>
        <input id={id} className="cw-item" name={name} key={id} type='text' 
          minLength='1' maxLength='1' value={val}
          ref={ textInput }
          onClick={(ev) => onClick(ev)}
          onChange={(ev) => onChange(ev)}
          onKeyUp={(ev) => onKeyUp(ev)}
          onKeyDown={(ev) => onKeyDown(ev)}
          >
        </input>
      </>   
    );
  }

  const renderBlankCell = (id) => {
    return (
      <>
        <span id={id} className='cw-blank' name={id} key={id} >
        </span>
      </>   
    );
  }

  const renderCell = (boardArrayKey, cword, updateTimestamp, onClick, onChange, onKeyUp, onKeyDown) => {

    let cellMap = cword.cellMap;

    let pMaxAcross = cword.getNumberedMaxAcross();
    let pMaxDown = cword.getNumberedMaxDown();

    let y = Util.row(boardArrayKey);
    let x = Util.column(boardArrayKey);
    let id = 'na-'+Util.toCellId(y,x);
    let clsNum = 'cw-number-item';

    if (x===1 || x===pMaxAcross) {
      if (y ===1 || y === pMaxDown) {
        return renderNumber(id, clsNum, '');
      } else {
        return renderNumber(id, clsNum, ''+(y-1));
      }
    } else if (y===1 || y===pMaxDown) {
      if (x ===1 || x === pMaxAcross) {
        return renderNumber(id, clsNum, '');
      } else {
        return renderNumber(id, clsNum, ''+(x-1));
      }
    } else {
      let xVal = x-1;
      let yVal = y-1; 
      let cellKey = Util.cellKey(yVal,xVal);
      id = Util.toCellId(yVal, xVal);
      // let val = '';
      let isBlank = true;
      let cell = null;
      if (cellMap.has(cellKey)) {
        isBlank = false;
        cell = cellMap.get(cellKey);
        // val = cell.value;
      }
      if (isBlank) {
        return renderBlankCell(id);
      } else {
        return renderNormalCell(id, cell, updateTimestamp, onClick, onChange, onKeyUp, onKeyDown);
      } 
    }
  }

    // key is "special", even though its been passed in - it does not show in props !!

  let cword = props.cword;
  let updateTimestamp= props.updateTimestamp;

  let boardArrayKey = props.boardArrayKey;
  if (boardArrayKey == null) {
    return <p>E101</p>
  } else {
    // console.log('ParamCell : render : boardArrayKey : '+boardArrayKey);

    let onClick= props.onClick;
    let onChange = props.onChange;

    let onKeyUp = props.onKeyUp;
    let onKeyDown = props.onKeyDown;

    return (
      <>
      {renderCell(boardArrayKey, cword, updateTimestamp, onClick, onChange, onKeyUp, onKeyDown)}
      </>
    );
  }
}

export default PlayCell;
