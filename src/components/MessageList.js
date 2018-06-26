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
  if(this.props.isActiveRoom === message.roomId) {
  return
  {this.state.messages.map( (message)  =>
      <li key={message.key}>
        <span className="userinfo">{message.username}</span>
        <span className="content">{message.content}</span>
        <span className="content">{message.sentAt}</span>
      </li>
     )}
} else {
  null;
}
}

render() {
    return (
      <section id="message-container" onClick={() => this.handleRoomActive(this.state.message)}>
      </section>
    );
  }
}

export default MessageList;
