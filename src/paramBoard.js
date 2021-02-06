import React from 'react';
import ParamCell from './paramCell';
import * as Util from './util';

class ParamBoard extends React.Component {

  constructor(props) {
    
    super(props);
    this.state = {};
  }

  render() {
    // console.log('ParamBoard : render : enter');

    let cword = this.props.cword;

    // let size = cword.size;

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
          // console.log("create paramCell for boardArrayKey : ..."+boardArrayKey+"... index : "+index);
          return(
            <ParamCell 
              key={boardArrayKey}
              boardArrayKey={boardArrayKey}
              cword={cword}
              onClick={ this.props.onClickParamCell }
            />
          );
        } 
      ) }
      </>
    );
  }
}

export default ParamBoard;
