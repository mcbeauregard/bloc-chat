import React, { Component } from 'react';
import './MessageList.css';

class MessageList extends Component {
  constructor(props){
    super(props);
    this.state = { messages: []}
    this.messagesRef = this.props.firebase.database().ref('Messages');
    this.timeStamp = this.props.firebase.database.ServerValue.TIMESTAMP;
    console.log('message displaying');
  }

  componentDidMount() {
    console.log("message component mounted");
  this.messagesRef.on('child_added', snapshot => {
    const message = snapshot.val();
    message.roomId = snapshot.key;
    this.setState({ messages: this.state.messages.concat(message) })
  });
}

render() {

  const messageItems = (
    this.state.messages.map((message) => {
      console.log('Active Room', this.props.activeRoom);
      console.log('Messages', this.state.Messages);
    if (this.props.activeRoom && (message.roomId === this.props.activeRoom.key)) {
      return (
          <li key={message.key}>
            <span className="userinfo">{message.username}</span>
            <span className="content">{message.content}</span>
            <span className="time">{message.sentAt}</span>
          </li>)
       } else {
         return false;
       }
     })
     );
console.log(messageItems);

    return (
      <section className="Message">
        <div>{messageItems}</div>
      </section>
    );
  }
}

export default MessageList;
