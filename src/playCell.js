import React from 'react';
import * as Util from './util';

class PlayCell extends React.Component {

  constructor(props) {
    
    super(props);
    this.state = {};
    this.textInput = React.createRef();
  }

  componentDidUpdate() {

    let elem = this.textInput.current;   
    if (elem != null) {
      let boardArrayKey = this.props.boardArrayKey;
      let y = Util.row(boardArrayKey);
      let x = Util.column(boardArrayKey);
      let xVal = x-1;
      let yVal = y-1; 
      let cellKey = Util.cellKey(yVal,xVal);
      let cword = this.props.cword;
      let cellMap = cword.cellMap;
      let cell = cellMap.get(cellKey);
      if (cword.isSelectedCell(cell)) { 
        elem.focus();
      } 
    } 
  }

  renderNumber(id, cls, val) {
    // console.log('PlayCell : renderNumber : id : '+id);
    return (
      <>
        <div id={id} className={cls} name={id} key={id} readOnly>
          {val}
        </div>
      </>
    );
  }

  renderNormalCell(id, cell, updateTimestamp, onClick, onChange, onKeyUp, onKeyDown) {
  
    let val = cell.value;
   
    // used to stop auto-complete
    let name = id+"-"+updateTimestamp;
  
    return (
      <>
        <input id={id} className="cw-item" name={name} key={id} type='text' 
          minLength='1' maxLength='1' value={val}
          ref={ this.textInput }
          onClick={(ev) => onClick(ev)}
          onChange={(ev) => onChange(ev)}
          onKeyUp={(ev) => onKeyUp(ev)}
          onKeyDown={(ev) => onKeyDown(ev)}
          >
        </input>
      </>   
    );
    
    
  }

  renderBlankCell(id) {
    // console.log('PlayCell : renderBlankCell : id : '+id);

    return (
      <>
        <span id={id} className='cw-blank' name={id} key={id} >
        </span>
      </>   
    );
  }

  renderCell(boardArrayKey, cword, updateTimestamp, onClick, onChange, onKeyUp, onKeyDown) {

    let cellMap = cword.cellMap;

    let pMaxAcross = cword.getNumberedMaxAcross();
    let pMaxDown = cword.getNumberedMaxDown();

    let y = Util.row(boardArrayKey);
    let x = Util.column(boardArrayKey);
    let id = 'na-'+Util.toCellId(y,x);
    let clsNum = 'cw-number-item';

    if (x===1 || x===pMaxAcross) {
      if (y ===1 || y === pMaxDown) {
        return this.renderNumber(id, clsNum, '');
      } else {
        return this.renderNumber(id, clsNum, ''+(y-1));
      }
    } else if (y===1 || y===pMaxDown) {
      if (x ===1 || x === pMaxAcross) {
        return this.renderNumber(id, clsNum, '');
      } else {
        return this.renderNumber(id, clsNum, ''+(x-1));
      }
    } else {
      let xVal = x-1;
      let yVal = y-1; 
      let cellKey = Util.cellKey(yVal,xVal);
      id = Util.toCellId(yVal, xVal);
      // let val = '';
      let isBlank = true;
      let cell = null;
      if (cellMap.has(cellKey)) {
        isBlank = false;
        cell = cellMap.get(cellKey);
        // val = cell.value;
      }
      if (isBlank) {
        return this.renderBlankCell(id);
      } else {
        return this.renderNormalCell(id, cell, updateTimestamp, onClick, onChange, onKeyUp, onKeyDown);
      } 
    }
  }
  
  render() {
    // console.log('PlayCell : render : enter');

    // key is "special", even though its been passed in - it does not show in props !!

    let cword = this.props.cword;
    let updateTimestamp= this.props.updateTimestamp;

    let boardArrayKey = this.props.boardArrayKey;
    if (boardArrayKey == null) {
      return <p>E101</p>
    } else {
      // console.log('ParamCell : render : boardArrayKey : '+boardArrayKey);

      let onClick= this.props.onClick;
      let onChange = this.props.onChange;

      let onKeyUp = this.props.onKeyUp;
      let onKeyDown = this.props.onKeyDown;

      return (
        <>
        {this.renderCell(boardArrayKey, cword, updateTimestamp, onClick, onChange, onKeyUp, onKeyDown)}
        </>
      );
    }
    
  }
}

export default PlayCell;
