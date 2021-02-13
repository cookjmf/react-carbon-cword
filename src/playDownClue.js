import React from 'react';
import * as Util from './util';

const PlayDownClue = (props) => {

  let cword = props.cword;

  let downClueKey = props.downClueKey;
  let downClueNum = props.downClueNum;
  let clueMap = cword.clueMap;
  let clue = clueMap.get(downClueKey);

  let id = 'cw-clues-down-row-'+(downClueNum+1);
  let labelText = clue.getLabel()+". ";

  let id2 = 'cdo'+downClueKey;
  let id3 = downClueKey;

  let href = "#acdo"+downClueKey;

  let ancText = clue.text+' ('+clue.answer.length+')';

  let style1 = null;
  if (cword.isSelectedClue(clue)) {
    style1 = {
      'backgroundColor': Util.COLOR_YELLOW
    }
  }

  return (
    <>
    <div id={id} className="cw-clues-row">
    <span className="cw-clues-label">
    {labelText}
    </span>
    <span id={id2} className="cw-clues-list-item cw-clues-list-down"
    style={style1}
    >
    <a id={id3} className="cw-clues-link" href={href}
    onClick={(ev) => props.onClick(ev.target.id)}
    >
    {ancText}
    </a>
    </span>
    </div>
    </>
  );
  
}

export default PlayDownClue;
