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

handleRoomActive(message){
  if(this.state.isActiveRoom && this.state.room.key === message.key) {
  this.message.key;
} else {
  null;
}
}

render() {
    return (
      <section id="message-container">
          <ul className="message">
          {this.state.messages.map( (message, index)  =>
            <li key={message.key} onClick={() => this.handleRoomActive(message, index)}>
              <span className="userinfo">{message.username}</span>
              <span className="content">{message.content}</span>
              <span className="content">{message.sentAt}</span>
            </li>
         )}
          </ul>
      </section>
    );
  }
}

export default MessageList;
