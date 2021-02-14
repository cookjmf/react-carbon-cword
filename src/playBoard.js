import React from 'react';
import PlayCell from './playCell';
import * as Util from './util';

const PlayBoard = (props) => {

  let cword = props.cword;

  let numberedMaxAcross = cword.getNumberedMaxAcross();
  let numberedMaxDown = cword.getNumberedMaxDown();

  let boardArray = [];
  for (let y=1; y<=numberedMaxDown; y++) {
    for (let x=1; x<=numberedMaxAcross; x++) {
      boardArray.push(Util.cellKey(y,x));
    }
  }

  return (
    <>
    { boardArray.map( 
      (boardArrayKey, index) => { 
       
        return(
          <PlayCell 
            key={boardArrayKey}
            boardArrayKey={boardArrayKey}
            cword={cword}
            updateTimestamp={ props.updateTimestamp}    
            onClick={ props.onClickPlayCell }
            onChange={ props.onChangePlayCell }
            onKeyUp={ props.onKeyUpPlayCell }
            onKeyDown={ props.onKeyDownPlayCell }
          />
        );
      } 
    ) }
    </>
  );
  
}

export default PlayBoard;
