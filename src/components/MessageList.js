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

  const messageItem = (
    this.state.messages.filter((message) => {
    if (this.props.activeRoom && (message.roomId === this.props.activeRoom.key)) {
      return
          <li key={message.key}>
            <span className="userinfo">{message.username}</span>
            <span className="content">{message.content}</span>
            <span className="time">{message.sentAt}</span>
          </li>
       } return null;
     })
     );

    return (
      <section className="Message">
        <div>{messageItem}</div>
      </section>
    );
  }
}

export default MessageList;
