class Msg {
  constructor(sev, text) {
    this.text = text;
    this.sev = sev;
    this.confirmText = '';
    this.confirmId = '';
    this.detail = '';
    this.prefix = '';
    this.errorId = '';
    if (sev === 'E') {
      this.cls = 'cw-message-error';
    } else if (sev === 'W') {
      this.cls = 'cw-message-warn';
    } else if (sev === 'I') {
      this.cls = 'cw-message-info';
    }
  }

  fullText() {
    let fullText = this.text;
    let p = this.prefix;
    if (p != null && p.length > 0) {
      return p+" "+fullText;
    }
    let d = this.detail;
    if (d != null && d.length > 0) {
      return fullText+" "+d;
    }
    return fullText;
  }
}

export default Msg;