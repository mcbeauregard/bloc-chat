import React, { Component } from 'react';
import './MessageList.css';

class MessageList extends Component {
  constructor(props){
    super(props);
    this.state = { messages: [], message: [], roomId: "", username: "", newMessage: ""}
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
      username: this.props.activeUser ? this.props.activeUser.displayName : "Guest",
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP
      });
    this.setState({newMessage:""}); // Updates message list with new message item, if empty leaves field blank.
  }

handleNewMessage = (e) => {
    this.setState({ newMessage: e.target.value})
  }

handleDateTime = (timestamp) => {
  var d =  new Date(timestamp),
    yyyy = d.getFullYear(),
    mm = ('0' + (d.getMonth() + 1)).slice(-2),	// Months are zero based. Add leading 0.
    dd = ('0' + d.getDate()).slice(-2),			// Add leading 0.
    hh = d.getHours(),
    h = hh,
    min = ('0' + d.getMinutes()).slice(-2),		// Add leading 0.
    ampm = 'AM',
    time;

    if (hh > 12) {
    h = hh - 12;
    ampm = 'PM';
  } else if (hh === 12) {
    h = 12;
    ampm = 'PM';
  } else if (hh == 0) {
    h = 12;
  }

// ie: 2013-02-18, 8:35 AM
time = yyyy + '-' + mm + '-' + dd + ', ' + h + ':' + min + ' ' + ampm;

return time;
}
  render() {
    const messageItems = (
      this.state.messages.map((message, index) => {
      if (this.props.activeRoom && (message.roomId === this.props.activeRoom.key)) {
        return (
            <li key={index}>
              <span className="userinfo">{message.username}: </span>
              <span className="content">{message.content} </span>
              <span className="time">{this.handleDateTime(message.sentAt)}</span>
            </li>)
         } else {
           return false;
         }
       })
       );

    return (
        <section className="Message">
        <h3>{this.props.activeRoom  ? this.props.activeRoom.name : null}</h3>
          <div>{messageItems}</div>
          <form id="createMessageForm" onSubmit={ (e) => { e.preventDefault(); this.handleSubmitMessage(e)} }>
             <input type="text" value={ this.state.newMessage} onChange={this.handleNewMessage} placeholder="Type a new message" />
             <button>Send</button>
          </form>
        </section>
      );
    }
  }


export default MessageList;
