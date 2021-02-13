import React from 'react';

import 'carbon-components/css/carbon-components.min.css';
import { InlineNotification, NotificationActionButton, Button } from 'carbon-components-react';

const Message = (props) => {

  console.log('Message : enter : render');
  console.log('Message : render : props : ' + JSON.stringify(props));

  const renderWithConfirm = (fullText, kind, confirmText, confirmId) => {

    if (fullText != null && fullText.length > 0) {

      return (
        <div id="cw-message-cont" className="cw-message-cont">
          <InlineNotification
            kind={kind}
            title={fullText}
            style={{ "width": "fit-content" }} 
            onCloseButtonClick={() => props.onClickMessageClose()}
            
            actions={
              <NotificationActionButton
                id={confirmId}
                onClick={(ev) => props.onClickMessageConfirm(ev.target.id)}
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
            onClick={(ev) => props.onClickMessageConfirm(ev.target.id)}
          >
          {confirmText}
          </Button>

        </div>
      );
    }
      
  }

  const renderSimple = (fullText, kind) => {
    return (
      <div id="cw-message-cont" className="cw-message-cont">
        <InlineNotification
          kind={kind}
          title={fullText}
          style={{ "width": "fit-content" }} 
          onCloseButtonClick={() => props.onClickMessageClose()}
          >
        </InlineNotification>
      </div>
    );
  }

  let msg = props.msg;
  
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

      return renderWithConfirm(fullText, kind, confirmText, confirmId);

    } else {
      return renderSimple(fullText, kind);
    }
  }
  
}

export default Message;
