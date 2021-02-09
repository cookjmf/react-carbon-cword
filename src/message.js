import React from 'react';

import 'carbon-components/css/carbon-components.min.css';
import { InlineNotification, NotificationActionButton, Button } from 'carbon-components-react';

class Message extends React.Component {

  constructor(props) {

    super(props);
    this.state = {};
  }

  renderWithConfirm(fullText, kind, confirmText, confirmId) {

    if (fullText != null && fullText.length > 0) {

      return (
        <div id="cw-message-cont" className="cw-message-cont">
          <InlineNotification
            kind={kind}
            title={fullText}
            style={{ "width": "fit-content" }} 
            onCloseButtonClick={() => this.props.onClickMessageClose()}
            
            actions={
              <NotificationActionButton
                id={confirmId}
                onClick={(ev) => this.props.onClickMessageConfirm(ev.target.id)}
              >

                {confirmText}

              
              </NotificationActionButton>
            }
            >

          </InlineNotification>
        </div>
      );

    } else {
      // if there is no text then its just a button (not a notification)

      return (
        <div id="cw-message-cont" className="cw-message-cont">
          <Button
            kind="primary"            
            id={confirmId}
            onClick={(ev) => this.props.onClickMessageConfirm(ev.target.id)}
          >
          {confirmText}
          </Button>

        </div>
      );
    }
      
  }

  renderSimple(fullText, kind) {

    return (
      <div id="cw-message-cont" className="cw-message-cont">
        <InlineNotification
          kind={kind}
          title={fullText}
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
    
    if (msg == null) {
      return (
        <div id="cw-message-cont" className="cw-message-cont">
        </div>
      );
    } else {

      let fullText = msg.fullText();
      let confirmText = msg.confirmText;
      let confirmId = msg.confirmId;
      let kind = msg.kind();

      if (confirmText != null && confirmText.length > 0) {

        return this.renderWithConfirm(fullText, kind, confirmText, confirmId);

      } else {
        return this.renderSimple(fullText, kind);
      }
    }
  }
}

export default Message;
