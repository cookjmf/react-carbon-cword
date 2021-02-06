import React from 'react';
import PlayCellLabel from './playCellLabel';
import * as Util from './util';

class PlayBoardLabel extends React.Component {

  constructor(props) {
    
    super(props);
    this.state = {};
  }

  render() {
    // console.log('PlayBoardLabel : render : enter');

    let cword = this.props.cword;

    var labelCells = cword.getLabelCells();

    let boardArray = [];
    for (var i=0; i<labelCells.length; i++) {
      var cell = labelCells[i];
      boardArray.push(Util.cellKey(cell.y,cell.x));
      
    }

    return (
      <>
      { boardArray.map( 
        (boardArrayKey, index) => { 
          // console.log("create PlayCellLabel for boardArrayKey : ..."+boardArrayKey+"... index : "+index);
          return(
            <PlayCellLabel
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

export default PlayBoardLabel;
