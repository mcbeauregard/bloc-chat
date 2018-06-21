import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props){
    super(props);
    this.state = {
      messages: []
    }
    this.messagesRef = this.props.firebase.database().ref('Messages');
  }

  componentDidMount() {
  this.roomsRef.on('child_added', snapshot => {
    const room = snapshot.val();
    message.key = snapshot.key;
    this.setState({ rooms: this.state.messages.concat( message ) })
  });
}

  render() {
    return (
          <section className="message-item">
          {this.state.messages.map(message,index) =>
            <li key={index}>
              <span className="userinfo">{message.username}:{message.sentAt}</span>
              <span className="content">{message.content}</span>
            </li>)}
          </section>
    );
  }
  }
