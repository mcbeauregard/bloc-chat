import React, { Component } from 'react';
import * as firebase from 'firebase';
import './App.css';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User';

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAzz1beNTHLu4P-bke07BYOtSW4goFqQ-A",
    authDomain: "bloc-chat-e20f5.firebaseapp.com",
    databaseURL: "https://bloc-chat-e20f5.firebaseio.com",
    projectId: "bloc-chat-e20f5",
    storageBucket: "bloc-chat-e20f5.appspot.com",
    messagingSenderId: "459689726107"
  };
  firebase.initializeApp(config);

class App extends Component {
  constructor(props){
    super(props);
    this.state = { activeRoom: null };
  }

isActiveRoom = (room) => { // new method to handle which room is active when user clicks on room. Accepts room data.
    this.setState({ activeRoom: room}); // Updates room with active room name.
  }

setUser = (user) => {
  this.setState({ activeUser: user });
}

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Bloc Chat</h1>
        <nav>
        <div className="Room-container">
          <span to='/RoomList'>Chat Rooms</span>
          <main>
            <RoomList firebase={firebase} activeRoom={this.state.activeRoom} isActiveRoom={ (room) => this.isActiveRoom(room)}/>
          </main>
        </div>
        </nav>
        </header>
        <main className="Message-container">
        <h2>Messages</h2>
          <MessageList firebase={firebase} activeRoom={this.state.activeRoom}/>
        <div className="User-header">
          <User firebase={firebase} activeUser={this.state.activeUser} setUser={this.state.setUser} />
        </div>
        </main>
      </div>
    );
  }
}

export default App;
