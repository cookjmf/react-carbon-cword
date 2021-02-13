import React from 'react';
import PlayCellBg from './playCellBg';
import * as Util from './util';

const PlayBoardBg = (props) => {

  let cword = props.cword;

  let maxAcross = cword.getMaxAcross();
  let maxDown = cword.getMaxDown();

  let boardArray = [];
  for (let y=1; y<=maxDown; y++) {
    for (let x=1; x<=maxAcross; x++) {
      boardArray.push(Util.cellKey(y,x));
    }
  }

  return (
    <>
    { boardArray.map( 
      (boardArrayKey, index) => { 
        return(
          <PlayCellBg
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

export default PlayBoardBg;
