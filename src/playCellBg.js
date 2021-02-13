import React from 'react';
import * as Util from './util';

const PlayCellBg = (props) => {

  const renderCell = (boardArrayKey, cword) => {

    let y = Util.row(boardArrayKey);
    let x = Util.column(boardArrayKey);

    let cellKey = Util.cellKey(y,x);
    let cellMap = cword.cellMap;
    let cell = cellMap.get(cellKey);

    if (cell == null) {
      return (
        <>
        </>   
      );
    } else {

      let bgColor = cell.bgColor;
      
      let id = 'itembg-'+Util.toCellId(y, x);

      let name = id;

      // the 1 is needed for numbered grid
      let cellGridRow = y + 1;
      let cellGridColumn = x + 1;

      let style1 = {
        'gridColumn': cellGridColumn,
        'gridRow': cellGridRow,
        'backgroundColor': bgColor
      }

      return (
        <>
          <span id={id} className="cw-itembg" name={name} key={id} 
          style={style1}
          >
          </span>
        </>   
      );

    }   
  }

  let cword = props.cword;

  let boardArrayKey = props.boardArrayKey;
  if (boardArrayKey == null) {
    return <p>E101</p>
  } else {

    return (
      <>
      {renderCell(boardArrayKey, cword)}
      </>
    );
  }
    
}

export default PlayCellBg;
