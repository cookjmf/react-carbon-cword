import React from 'react';
import * as Util from './util';

class PlayCellBg extends React.Component {

  constructor(props) {
    
    super(props);
    this.state = {};
  }

  renderCell(boardArrayKey, cword) {
    // console.log('PlayCellBg : renderCell : enter : boardArrayKey : '+boardArrayKey);
    let y = Util.row(boardArrayKey);
    let x = Util.column(boardArrayKey);

    let cellKey = Util.cellKey(y,x);
    let cellMap = cword.cellMap;
    let cell = cellMap.get(cellKey);

    if (cell == null) {
      return (
        <>
        </>   
      );
    } else {

      let bgColor = cell.bgColor;
      
      let id = 'itembg-'+Util.toCellId(y, x);

      let name = id;

      // the 1 is needed for numbered grid
      let cellGridRow = y + 1;
      let cellGridColumn = x + 1;

      let style1 = {
        'gridColumn': cellGridColumn,
        'gridRow': cellGridRow,
        'backgroundColor': bgColor
      }

      return (
        <>
          <span id={id} className="cw-itembg" name={name} key={id} 
          style={style1}
          >
          </span>
        </>   
      );

    }
    
  }
  
  render() {
    // console.log('PlayCellBg : render : enter');

    // key is "special", even though its been passed in - it does not show in props !!

    let cword = this.props.cword;

    let boardArrayKey = this.props.boardArrayKey;
    if (boardArrayKey == null) {
      return <p>E101</p>
    } else {
      // console.log('ParamCell : render : boardArrayKey : '+boardArrayKey);

      return (
        <>
        {this.renderCell(boardArrayKey, cword)}
        </>
      );
    }
    
  }
}

export default PlayCellBg;
