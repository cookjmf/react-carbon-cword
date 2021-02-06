import * as Util from './util';

/*
  Clue : a crossword clue
  
  y : row in grid of first letter
  x : column in grid of first letter
  isAcross : true if across , false if down
  clueNumber : number of clue
  answer : the solution for clue
  text : the text of clue
  n : ordinal of clue on row / column 
  firstCell : the Cell of first letter
  answerLen : length of answer
*/
class Clue {
  constructor(y, x, isAcross, clueNumber, answer, text, n) {
    this.y = y;
    this.x = x;
    this.isAcross = isAcross;
    this.clueNumber = clueNumber;
    this.answer = answer;
    this.text = text;
    this.n = n;
    this.firstCell = null;
    this.answerLen = 0;
  }

  getFirstCellKey() {
    return Util.cellKey(this.y,this.x); // x+'.'+clue.y;
  }

  toInputFormat() {
    // (Y|X|A/D|ClueId|Answer|Clue)
    let len = this.answerLen;

    var s = this.y+'|'+this.x;
    s += '|'+Util.direction(this.isAcross).toUpperCase();
    if (this.isAcross) {
      s += '|'+this.y;
    } else {
      s += '|'+this.x;
    }
    s += '.'+this.n+'.'+len+'|';
    for (var i=0; i<len; i++) {
      s+='X';
    }
    s+='|'+this.text;
    return s;
  }

  uniqLocation() {
    // return this.y+'.'+this.x+'.'+Util.direction(this.isAcross);
    return Util.uniqLocation(this.y,this.x,this.isAcross);
  }

  getLabel() {
    var k = 0;
    if (this.firstCell != null) {
      k = this.firstCell.label;           
    }
    return k;
  }

  getFrid() {
    var d = '';
    if (this.isAcross) {
      d = 'a.'+this.y+'.'+this.n;
    } else {
      d = 'd.'+this.x+'.'+this.n;
    }
    return d;
  }

  getSelectedText() {
    return this.getLabel() +'. ( '+this.getFrid()+' ) '+this.text+' ('+this.answerLen+')';
  }
}

export default Clue;