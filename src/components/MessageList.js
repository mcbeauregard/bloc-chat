import React, { Component } from 'react';
import './MessageList.css';

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
    <section className="Message">
        <ul className="message-item">
        {this.state.messages.map(message =>
          <li key={message.key} className={this.props.activeRoom && this.props.activeRoom.key ===  message.key ? 'message-item' : null }>
            <span className="userinfo">{message.username}</span>
            <span className="content">{message.content}</span>
            <span className="time">{message.sentAt}</span>
          </li>)
       }
        </ul>
    </section>
  )
}
}

export default MessageList;
