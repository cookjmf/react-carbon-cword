import React from 'react';
import * as Util from './util';

const PlayCellLabel = (props) => {

  const renderCell = (boardArrayKey, cellMap) => {
    
    let y = Util.row(boardArrayKey);
    let x = Util.column(boardArrayKey);

    let cellKey = Util.cellKey(y,x);
    let cell = cellMap.get(cellKey);
    let label = cell.label;
    
    let id = 'label-'+label;

    let name = id;

    // the 1 is needed for numbered grid
    let cellGridRow = y + 1;
    let cellGridColumn = x + 1;

    let style1 = {
      gridColumn: cellGridColumn,
      gridRow: cellGridRow,
    }

    return (
      <>
        <span id={id} className="cw-label" name={name} key={id} 
        style={style1}
        >
          <span className="cw-label-text">
            {label} 
          </span>
        </span>
      </>   
    );
    
  }
  
  let cword = props.cword;
  let cellMap = cword.cellMap;
  let boardArrayKey = props.boardArrayKey;
  if (boardArrayKey == null) {
    return <p>E101</p>
  } else {

    return (
      <>
      {renderCell(boardArrayKey, cellMap)}
      </>
    );
  }

}

export default PlayCellLabel;
