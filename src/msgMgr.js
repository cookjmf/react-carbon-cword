import Msg from './msg';

class MsgMgr {
  constructor() {
    this.clear();
  }

  addError(text, text2) {
    console.log("added ERROR : "+text);
    let msg = new Msg('E', text);
    msg.detail = text2;
    this.errors.push(msg);
  }

  addErrorId(text, text2, errorId) {
    console.log("added ERROR : "+text);
    let msg = new Msg('E', text);
    msg.detail = text2;
    msg.errorId = errorId;
    this.errors.push(msg);
  }

  addWarn(text) {
    console.log("added WARN : "+text);
    this.warnings.push(new Msg('W', text));
  }

  addInfo(text) {
    console.log("added INFO : "+text);
    this.infos.push(new Msg('I', text));
  }

  addConfirmInfo(text, confirmText, confirmId) {
    console.log("added CINFO : ["+text+"],["+confirmText+"],["+confirmId+"]");
    let msg = new Msg('I', text);
    msg.confirmText = confirmText;
    msg.confirmId = confirmId;
    this.infos.push(msg);
  }

  empty() {
    let num = this.errors.length + this.warnings.length + this.infos.length;
    if (num === 0) {
      return true;
    }
    return false;
  }

  msg() {
    // find the most important msg
    if (this.errors.length > 0) {
      return this.errors[this.errors.length-1];
    } else if (this.warnings.length > 0) {
      return this.warnings[this.warnings.length-1];
    } else if (this.infos.length > 0) {
      return this.infos[this.infos.length-1];
    }
    return null;
  }

  firstMsg() {
    // find the most important msg
    if (this.errors.length > 0) {
      this.errors = this.errors.reverse();
    } else if (this.warnings.length > 0) {
      this.warnings = this.warnings.reverse();
    } else if (this.infos.length > 0) {
      this.infos = this.infos.reverse();
    }
    return this.msg();
  }

  clear() {
    this.errors = [];
    this.warnings = [];
    this.infos = [];
  }
}

export default MsgMgr;