import React from 'react';
import * as Util from './util';

class ParamDownClues extends React.Component {

  constructor(props) {
    
    super(props);
    this.state = {};
    this.textarea = React.createRef();
  }

  componentDidUpdate() {

    let elem = this.textarea.current;   
    if (elem != null) {
      let cword = this.props.cword;
      if (cword.paramTextareaSelected === Util.TA_DOWN_CLUES) { 
        elem.selectionStart = cword.paramDownCluesStart;
        elem.selectionEnd = cword.paramDownCluesEnd;
        elem.focus();
      }
    } 
  }
  
  render() {
    // console.log('ParamDownClues : render : enter');

    let cword = this.props.cword;

    let size = cword.size;
    let suf = size+'by'+size;
    let taClass="cw-clues-param-text-"+suf;

    let ph = "Enter Down Clues";
    let text = "";
    if (cword.vertClues.length > 0) {

      text = ''+cword.vertClues;

      ph = "";
    } 

    return (
      <>
      <div id="cw-clues-list-down" className="cw-clues-list-down">
        <div id="cw-clues-list-down-title" className="cw-clues-list-title">
          Down
        </div>
        <div >
          <textarea id="cw-clues-param-down-text" className={taClass}
          placeholder={ph}
          ref={ this.textarea }
          onChange={(ev) => this.props.onKeyUp(ev)}
          onKeyUp={(ev) => this.props.onKeyUp(ev)}
          value={text}
          >
          </textarea>
        </div>
      </div>
      </>
    );
  }
}

export default ParamDownClues;
