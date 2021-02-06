import React from 'react';
import PlayCell from './playCell';
import * as Util from './util';

class PlayBoard extends React.Component {

  constructor(props) {
    
    super(props);
    this.state = {};
  }

  render() {
    // console.log('PlayBoard : render : enter');

    let cword = this.props.cword;

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
          // console.log("create playCell for boardArrayKey : ..."+boardArrayKey+"... index : "+index);
          return(
            <PlayCell 
              key={boardArrayKey}
              boardArrayKey={boardArrayKey}
              cword={cword}
              updateTimestamp={ this.props.updateTimestamp}    
              onClick={ this.props.onClickPlayCell }
              onChange={ this.props.onChangePlayCell }
              onKeyUp={ this.props.onKeyUpPlayCell }
              onKeyDown={ this.props.onKeyDownPlayCell }
            />
          );
        } 
      ) }
      </>
    );
  }
}

export default PlayBoard;
