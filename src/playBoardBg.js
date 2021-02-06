import React from 'react';
import PlayCellBg from './playCellBg';
import * as Util from './util';

class PlayBoardBg extends React.Component {

  constructor(props) {
    
    super(props);
    this.state = {};
  }

  render() {
    // console.log('PlayBoardBg : render : enter');

    let cword = this.props.cword;

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
          // console.log("create playCellBg for boardArrayKey : ..."+boardArrayKey+"... index : "+index);
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
}

export default PlayBoardBg;
