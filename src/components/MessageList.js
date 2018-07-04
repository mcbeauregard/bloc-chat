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

handleNewMessage = (e) => {
  this.setState({ newMessage: e.target.value})
}

handleSubmitMessage = (newMessage) => { // new method to handle when a new message item is added when user clicks button. Accepts event data.
  this.messagesRef.push({ // method used in firebase to add an item to a location.
    message: newMessage
  });
  this.setState({ newMessage: ""}); // Updates message list with new message item, if empty leaves field blank.
}

render() {

  const messageItems = (
    this.state.messages.map((message, index) => {
      console.log('Active Room', this.props.activeRoom);
      console.log('Messages', this.state.Messages);
    if (this.props.activeRoom && (message.roomId === this.props.activeRoom.key)) {
      return (
          <li key={index}>
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
        <form id="createMessageForm" onSubmit={ (e) => { e.preventDefault(); this.handleSubmitMessage(this.state.newMessage) } }>
          <input type="text" value={ this.state.newMessage } onChange={ this.handleNewMessage} placeholder="Type a new message" />
          <button>Submit</button>
        </form>
      </section>
    );
  }
}

export default MessageList;
