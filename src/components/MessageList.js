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

render() {
  return (
    <section id="message-container">
        <ul className="message-item">
        {this.state.messages.map(message =>
          <li key={message.key}>
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
