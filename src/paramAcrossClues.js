import React from 'react';
import * as Util from './util';

class ParamAcrossClues extends React.Component {

  constructor(props) {
    
    super(props);
    this.state = {};
    this.textarea = React.createRef();
  }

  componentDidUpdate() {
    console.log('ParamAcrossClues : componentDidUpdate : enter');
    //  https://stackoverflow.com/questions/53782804/how-to-set-cursor-position-inside-textarea-in-reactjs
    let elem = this.textarea.current;   
    if (elem != null) {
      let cword = this.props.cword;

      console.log('paramTextareaSelected = '+cword.paramTextareaSelected);
      console.log('paramAcrossCluesStart = '+cword.paramAcrossCluesStart);
      console.log('paramAcrossCluesEnd = '+cword.paramAcrossCluesEnd);

      if (cword.paramTextareaSelected === Util.TA_ACROSS_CLUES) { 
        elem.selectionStart = cword.paramAcrossCluesStart;
        elem.selectionEnd = cword.paramAcrossCluesEnd;
        elem.focus();
      }
    } 
  }
  
  render() {
    console.log('ParamAcrossClues : render : enter');

    let cword = this.props.cword;

    let size = cword.size;
    let suf = size+'by'+size;
    let taClass="cw-clues-param-text-"+suf;

    console.log('horizClues = '+cword.horizClues);
    console.log('paramTextareaSelected = '+cword.paramTextareaSelected);
    console.log('paramAcrossCluesStart = '+cword.paramAcrossCluesStart);
    console.log('paramAcrossCluesEnd = '+cword.paramAcrossCluesEnd);

    let ph = "Enter Across Clues";
    let text = "";
    if (cword.horizClues.length > 0) {
      text = ''+cword.horizClues; 
      ph = "";
    } 

    return (
      <>
      <div id="cw-clues-list-across" className="cw-clues-list-across">
        <div id="cw-clues-list-across-title" className="cw-clues-list-title">
          Across
        </div>
        <div >
          <textarea id="cw-clues-param-across-text" className={taClass}
          placeholder={ph}
          ref={ this.textarea }
          onKeyUp={(ev) => this.props.onKeyUp(ev)}
          onChange={(ev) => this.props.onKeyUp(ev)}
          value={text}
          >
          </textarea>
        </div>
      </div>
      </>
    );
  }

}

export default ParamAcrossClues;
