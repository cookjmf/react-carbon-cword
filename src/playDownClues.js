import React from 'react';
import PlayDownClue from './playDownClue';

const PlayDownClues = (props) => {

  let cword = props.cword;

  let downClueKeys = [];
  let downClues = cword.getDownClues();
  for (let i=0; i<downClues.length; i++) {
    let clue = downClues[i];
    let key = clue.uniqLocation();
    downClueKeys.push(key);
  }

  return (
    <>
      { downClueKeys.map( 
      (downClueKey, index) => { 
        
        return(
          <PlayDownClue
          key={downClueKey}
          downClueKey={downClueKey}
          downClueNum={index}
          cword={cword}
          onClick={ props.onClickDownClue }
          >
          </PlayDownClue>
        )
      }
      )
    }
    </>
  );
  
}

export default PlayDownClues;
