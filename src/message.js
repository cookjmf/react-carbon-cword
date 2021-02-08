import React from 'react';

import 'carbon-components/css/carbon-components.min.css';
import { InlineNotification } from 'carbon-components-react';

class Message extends React.Component {

  constructor(props) {

    super(props);
    this.state = {};
  }

  renderWithConfirm(fullText, cls, confirmText, confirmId) {

    const style1 = {
      'textDecoration': 'underline'
    };
    // className="cw-cont"
    if (fullText != null && fullText.length > 0) {
      return (
        <div id="cw-message-cont" className="cw-message-cont">
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
        <div id="cw-message-cont" className="cw-message-cont">
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

    // const style1 = {
    //   'textDecoration': 'underline'
    // };

    // return (
    //   <div id="cw-message-cont" className="cw-cont"> 
    //     <span className={cls} id='cw-message-text'>
    //       {fullText}
    //     </span>
    //     <span className={cls} id='cw-message-text'>
    //       |
    //     </span>
    //     <a className={cls} id='cw-message-close' 
    //       style={style1} href='#closemessage'
    //       onClick={() => this.props.onClickMessageClose()}
    //       >
    //       Close
    //     </a>
    //   </div>
    // );

    // "padding":"3em",
    // hideCloseButton="close"

    //    kind	
    // Specify what state the notification represents
    // 'error' | 'info' | 'info-square' | 'success' | 'warning' | 'warning-alt'
    // 'error'

    let kind = "";
    if (cls === "cw-message-error") {
      kind = "error";
    } else if (cls === "cw-message-warn") {
      kind = "warning";
    } else if (cls === "cw-message-success") {
      kind = "success";
    } else if (cls === "cw-message-info") {
      kind = "info";
    }

    // style = {{      
    //   "display":"flex", 
    //   "flex-direction":"column" , 
    //   "align-items": "true", 
    //   "center":"true"
    //  }}     
    // >
    //   <div
    //   style = {{ "position":"relative", "width":"100%", "z-index":"0" }}  

    // style={{ "width": "fit-content" }}
    // className="cw-cont"
    return (
      <div id="cw-message-cont" className="cw-message-cont">
        <InlineNotification
          kind={kind}
          title={fullText}
          subtitle="subtitleHEREAA"
          caption="captionHERE"
          style={{ "width": "fit-content" }} 
          onCloseButtonClick={() => this.props.onClickMessageClose()}
          >
        </InlineNotification>
      </div>
    );
  }

  render() {
    console.log('Message : enter : render');
    console.log('Message : render : props : ' + JSON.stringify(this.props));

    let msg = this.props.msg;
    // className="cw-cont"
    if (msg == null) {
      return (
        <div id="cw-message-cont" className="cw-message-cont">
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
