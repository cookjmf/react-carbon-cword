import React from 'react';

class Message extends React.Component {

  constructor(props) {
    
    super(props);
    this.state = {};
  }

  renderWithConfirm(fullText, cls, confirmText, confirmId) {
    
    const style1 = {
      'textDecoration': 'underline'
    };

    if (fullText != null && fullText.length > 0) {
      return (
        <div id="cw-message-cont" className="cw-cont"> 
          <span className={cls} id='cw-message-text'>
            {fullText}
          </span>
          <span className={cls} id='cw-message-text'>
            |
          </span>
          <a className={cls} id={confirmId}
            style={style1} href='#confirmmessage'
            onClick={(ev) => this.props.onClickMessageConfirm(ev.target.id)}
            >
            {confirmText}
          </a>
          <span className={cls} id='cw-message-text'>
            |
          </span>
          <a className={cls} id='cw-message-close' 
            style={style1} href='#closemessage'
            onClick={() => this.props.onClickMessageClose()}
            >
            Close
          </a>
        </div>
      );
    } else {
      return (
        <div id="cw-message-cont" className="cw-cont"> 
          <a className={cls} id={confirmId}
            style={style1} href='#confirmmessage'
            onClick={(ev) => this.props.onClickMessageConfirm(ev.target.id)}
            >
            {confirmText}
          </a>
          <span className={cls} id='cw-message-text'>
            |
          </span>
          <a className={cls} id='cw-message-close' 
            style={style1} href='#closemessage'
            onClick={() => this.props.onClickMessageClose()}
            >
            Close
          </a>
        </div>
      );
    }

  }

  renderSimple(fullText, cls) {
    
    const style1 = {
      'textDecoration': 'underline'
    };

    return (
      <div id="cw-message-cont" className="cw-cont"> 
        <span className={cls} id='cw-message-text'>
          {fullText}
        </span>
        <span className={cls} id='cw-message-text'>
          |
        </span>
        <a className={cls} id='cw-message-close' 
          style={style1} href='#closemessage'
          onClick={() => this.props.onClickMessageClose()}
          >
          Close
        </a>
      </div>
    );
  }

  render() {
    console.log('Message : enter : render');
    console.log('Message : render : props : '+JSON.stringify(this.props));

    let msg = this.props.msg;

    if (msg == null) {
      return (
        <div id="cw-message-cont" className="cw-cont"> 
        </div>
      );
    } else {

      let fullText = msg.fullText();
      let cls = msg.cls;
      let confirmText = msg.confirmText;
      let confirmId = msg.confirmId;

      if (confirmText != null && confirmText.length > 0) {
                
        return this.renderWithConfirm(fullText, cls, confirmText, confirmId);
        
      } else {
        return this.renderSimple(fullText, cls);
      }
    }
  }
}

export default Message;
