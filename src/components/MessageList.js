import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props){
    super(props);
    this.state = {
      messages: []
    }
    this.messagesRef = this.props.firebase.database().ref('Messages');
    console.log('message displaying');
  }

  componentDidMount() {
    console.log("message component mounted");
  this.messagesRef.on('child_added', snapshot => {
    const message = snapshot.val();
    message.key = snapshot.key;
    this.setState({ messages: this.state.messages.concat(message) })
  });
}

      return <li key={message.key}>{message.content}</li>
    }
    return null;
  })
);

return(
  <div>
    <div>{messageBar}</div>
    <ul>{messageList}</ul>
  </div>
);
}
}

render() {
    return (
    <div className="message-container">
          {this.state.messages.map((message) => {
            if (message.roomId === activeRoom) {
          return  <li key={message.key} className="message-item">
              <span className="userinfo">{message.username}</span>
              <span className="content">{message.content}</span>
              <span className="content">{message.sentAt}</span>
            </li>
          } else {
            null;
          })
        }
        </div>
      );
    }
  }

export default MessageList;
