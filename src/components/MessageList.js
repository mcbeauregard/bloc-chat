import React, { Component } from 'react';
import './MessageList.css';

class MessageList extends Component {
  constructor(props){
    super(props);
    this.state = { messages: [], message: [], newMessage: ""}
    this.messagesRef = this.props.firebase.database().ref('Messages');
    this.timeStamp = this.props.firebase.database.ServerValue.TIMESTAMP;
    console.log('message displaying');
  }

  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat(message) })
    });
  }

handleSubmitMessage = (e) => { // new method to handle when a new message item is added when user clicks button. Accepts event data.
  this.messagesRef.push({ // method used in firebase to add an item to a location.
      content: this.state.newMessage,
      roomId: this.props.activeRoom.key,
      username:  this.props.activeUser ? this.props.activeUser.displayName : "Guest",
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP
  });
    this.setState({content: "", roomId:"", sentAt: "", username: ""}); // Updates message list with new message item, if empty leaves field blank.
  }

handleNewMessage = (e) => {
    this.setState({ newMessage: e.target.value})
  }

  render() {
    const messageItems = (
      this.state.messages.map((message, index) => {
      if (this.props.activeRoom && (message.roomId === this.props.activeRoom.key)) {
        return (
            <li key={index}>
              <span className="userinfo">{message.username}: </span>
              <span className="content">{message.content} </span>
              <span className="time">{message.sentAt}</span>
            </li>)
         } else {
           return false;
         }
       })
       );

    return (
        <section className="Message">
          <div>{messageItems}</div>
          <form id="createMessageForm" onSubmit={ (e) => { e.preventDefault(); this.handleSubmitMessage(e)} }>
            <input type="text" value={ this.state.newMessage} onChange={this.handleNewMessage} placeholder="Type a new message" />
            <button>Submit</button>
          </form>
        </section>
      );
    }
  }


export default MessageList;
