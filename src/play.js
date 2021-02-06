import React from 'react';
import PlayBoard from './playBoard';
import PlayBoardBg from './playBoardBg';
import PlayBoardLabel from './playBoardLabel';
import PlayAcrossClues from './playAcrossClues';
import PlayDownClues from './playDownClues';
// import * as Util from './util';

class Play extends React.Component {

  constructor(props) {
    
    super(props);
    this.state = {};
  }
  
  render() {
    // console.log('Play : render : enter');

    let cword = this.props.cword;

    let na = cword.getNumberedMaxAcross();
    let nd = cword.getNumberedMaxDown();

    let suffix = na+'by'+nd;
    let boardClassName = 'cw-board-'+suffix;
    let cluesClassName = 'cw-clues-'+suffix;

    let bgClassName = boardClassName+" cw-itembgs";
    let labelClassName = boardClassName+" cw-labels";

    let style1 = {
      'display': 'none'
    };
    let selectedClueText = "";
    let selectedClue = cword.selectedClue;
    if (selectedClue != null) {
      style1 = {
        'display': 'block'
      };
      selectedClueText = selectedClue.getSelectedText();
    }

    return (
      <div id="cw-cont" className="cw-cont">

        <div id="cw-selclue" className="cw-clues-current"
        style={style1} >
          {selectedClueText}
        </div>

        <div id="cw-board" className={boardClassName}>

          <PlayBoard
            cword={ cword}   
            updateTimestamp={ this.props.updateTimestamp}                  
            onClickPlayCell={ this.props.onClickPlayCell }
            onChangePlayCell={ this.props.onChangePlayCell }
            onKeyUpPlayCell={ this.props.onKeyUpPlayCell }
            onKeyDownPlayCell={ this.props.onKeyDownPlayCell }
          >
          </PlayBoard>

          <div id="cw-itembgs" className={bgClassName}>

            <PlayBoardBg
              cword={ cword}
            >
            </PlayBoardBg>

          </div>

          <div id="cw-labels" className={labelClassName}>

            <PlayBoardLabel
              cword={ cword}
            >
            </PlayBoardLabel>

          </div>

          <div id="cw-clues" className={cluesClassName}>

            <div id="cw-clues-list-across" className="cw-clues-list-across cw-clues-list">
              <div id="cw-clues-list-across-title" className="cw-clues-list-title">
              Across
              </div>

              <PlayAcrossClues
                cword={ cword} 
                onClickAcrossClue={ this.props.onClickAcrossClue }
              >         
              </PlayAcrossClues>

            </div>

            <hr>
            </hr>

            <div id="cw-clues-list-down" className="cw-clues-list-down cw-clues-list">
              <div id="cw-clues-list-down-title" className="cw-clues-list-title">
                Down
              </div>

              <PlayDownClues
                cword={ cword} 
                onClickDownClue={ this.props.onClickDownClue }
              >
              </PlayDownClues>
            </div>
          </div>
        </div>
      </div>
    );

  }

}

export default Play;
