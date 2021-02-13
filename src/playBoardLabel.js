import React from 'react';
import PlayCellLabel from './playCellLabel';
import * as Util from './util';

const PlayBoardLabel = (props) => {

  let cword = props.cword;

  var labelCells = cword.getLabelCells();

  let boardArray = [];
  for (var i=0; i<labelCells.length; i++) {
    var cell = labelCells[i];
    boardArray.push(Util.cellKey(cell.y,cell.x));
    
  }

  return (
    <>
    { boardArray.map( 
      (boardArrayKey, index) => { 
        return(
          <PlayCellLabel
            key={boardArrayKey}
            boardArrayKey={boardArrayKey}
            cword={cword}
          />
        );
      } 
    ) }
    </>
  );
  
}

export default PlayBoardLabel;
