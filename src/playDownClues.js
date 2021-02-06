import React from 'react';
import PlayDownClue from './playDownClue';

class PlayDownClues extends React.Component {

  constructor(props) {
    
    super(props);
    this.state = {};
  }
  
  render() {
    // console.log('PlayDownClues : render : enter');
  
    let cword = this.props.cword;

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
          // console.log("create downClue for downClueKey : ..."+downClueKey+"... index : "+index);
          return(
            <PlayDownClue
            key={downClueKey}
            downClueKey={downClueKey}
            downClueNum={index}
            cword={cword}
            onClick={ this.props.onClickDownClue }
            >
            </PlayDownClue>
          )
        }
        )
      }
      </>
    );
  }
}

export default PlayDownClues;
