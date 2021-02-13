import React from 'react';
import PlayAcrossClue from './playAcrossClue';

const PlayAcrossClues = (props) => {

  let cword = props.cword;

  let acrossClueKeys = [];
  let acrossClues = cword.getAcrossClues();
  for (let i=0; i<acrossClues.length; i++) {
    let clue = acrossClues[i];
    let key = clue.uniqLocation();
    acrossClueKeys.push(key);
  }

  return (
    <>
      { acrossClueKeys.map( 
      (acrossClueKey, index) => { 
        
        return(
          <PlayAcrossClue
          key={acrossClueKey}
          acrossClueKey={acrossClueKey}
          acrossClueNum={index}
          cword={cword}
          onClick={ props.onClickAcrossClue }
          >
          </PlayAcrossClue>
        )
      }
      )
    }
    </>
  );
  
}

export default PlayAcrossClues;
