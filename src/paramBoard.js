import React from 'react';
import ParamCell from './paramCell';
import * as Util from './util';

const ParamBoard = (props) => {

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
          <ParamCell 
            key={boardArrayKey}
            boardArrayKey={boardArrayKey}
            cword={cword}
            onClick={ props.onClickParamCell }
          />
        );
      } 
    ) }
    </>
  );
  
}

export default ParamBoard;
