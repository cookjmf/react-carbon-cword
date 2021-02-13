import React from 'react';
import * as Util from './util';

const ParamCell = (props) => { 

  const renderNumber = (id, cls, val) => {
    
    return (
      <>
        <div id={id} className={cls} name={id} key={id} readOnly>
          {val}
        </div>
      </>
    );
  }

  const renderInput = (id, cls, val, onClick) => {
    
    return (
      <>
        <input id={id} className={cls} name={id} key={id} type='text' 
          minLength='1' maxLength='1' value={val}
          onClick={(ev) => onClick(ev.target.id)}
          readOnly>
        </input>
      </>   
    );
  }

  const renderInputAsBlank = (id, cls, onClick) => {
    
  
    const style1 = {
      'backgroundColor': 'black'
    };

    return (
      <>
        <input id={id} className={cls} name={id} key={id} type='text' 
          minLength='0' maxLength='0' value=''
          style={style1}
          onClick={(ev) => onClick(ev.target.id)}
          readOnly>
        </input>
      </>   
    );
  }

  const renderCell = (boardArrayKey, pMaxAcross, pMaxDown, cellMap, onClick) => {
    
    let y = Util.row(boardArrayKey);
    let x = Util.column(boardArrayKey);
   
    let id = 'na-'+Util.toCellId(y,x);
    let clsNum = 'cw-number-item';
    let clsParam = 'cw-param-item';

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
      id = cellKey;
      let val = '';
      let isBlank = true;

      if (cellMap.has(cellKey)) {
        isBlank = false;
        let cell = cellMap.get(cellKey);
        val = cell.value;
      }
      if (isBlank) {
        return renderInputAsBlank(id, clsParam, onClick);
      } else {
        return renderInput(id, clsParam, val, onClick);
      } 
    }
  }

  let cword = props.cword;
  let cellMap = cword.cellMap;

  let numberedMaxAcross = cword.getNumberedMaxAcross();
  let numberedMaxDown = cword.getNumberedMaxDown();

  let boardArrayKey = props.boardArrayKey;
  if (boardArrayKey == null) {
    return <p>E101</p>
  } else {

    let pMaxAcross = numberedMaxAcross;
    let pMaxDown = numberedMaxDown;
    let onClick = props.onClick;

    return (
      <>
      {renderCell(boardArrayKey, pMaxAcross, pMaxDown, cellMap, onClick)}
      </>
    );
  }
}

export default ParamCell;
