import React from 'react';
import PlayAcrossClue from './playAcrossClue';

class PlayAcrossClues extends React.Component {

  constructor(props) {
    
    super(props);
    this.state = {};
  }
  
  render() {
    // console.log('PlayAcrossClues : render : enter');

    let cword = this.props.cword;

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
          // console.log("create acrossClue for acrossClueKey : ..."+acrossClueKey+"... index : "+index);
          return(
            <PlayAcrossClue
            key={acrossClueKey}
            acrossClueKey={acrossClueKey}
            acrossClueNum={index}
            cword={cword}
            onClick={ this.props.onClickAcrossClue }
            >
            </PlayAcrossClue>
          )
        }
        )
      }
      </>
    );
  }
}

export default PlayAcrossClues;
