import React from 'react';
import * as Util from './util';

class PlayCellLabel extends React.Component {

  constructor(props) {
    
    super(props);
    this.state = {};
  }

  renderCell(boardArrayKey, cellMap) {
    // console.log('PlayCellLabel : renderCell : enter : boardArrayKey : '+boardArrayKey);
    let y = Util.row(boardArrayKey);
    let x = Util.column(boardArrayKey);

    let cellKey = Util.cellKey(y,x);
    let cell = cellMap.get(cellKey);
    let label = cell.label;
    
    let id = 'label-'+label;

    let name = id;

    // the 1 is needed for numbered grid
    let cellGridRow = y + 1;
    let cellGridColumn = x + 1;

    let style1 = {
      gridColumn: cellGridColumn,
      gridRow: cellGridRow,
    }

    return (
      <>
        <span id={id} className="cw-label" name={name} key={id} 
        style={style1}
        >
          <span className="cw-label-text">
            {label} 
          </span>
        </span>
      </>   
    );
    
  }
  
  render() {
    // console.log('PlayCellLabel : render : enter');

    // key is "special", even though its been passed in - it does not show in props !!
    let cword = this.props.cword;
    let cellMap = cword.cellMap;
    let boardArrayKey = this.props.boardArrayKey;
    if (boardArrayKey == null) {
      return <p>E101</p>
    } else {
      // console.log('PlayCellLabel : render : boardArrayKey : '+boardArrayKey);

      return (
        <>
        {this.renderCell(boardArrayKey, cellMap)}
        </>
      );
    }
    
  }
}

export default PlayCellLabel;
