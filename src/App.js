import React, { Component } from 'react';
import * as firebase from 'firebase';
import './App.css';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';

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

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Bloc Chat</h1>
        <nav>
        <div className="topbar">
          <span to='/RoomList'>Chat Rooms</span>
          <main>
            <RoomList firebase={firebase} activeRoom={this.state.activeRoom} isActiveRoom={ (room) => this.isActiveRoom(room)}/>
          </main>
          <main>
            <MessageList firebase={firebase} activeRoom={this.state.activeRoom}/>
          </main>
        </div>
        </nav>
        </header>
      </div>
    );
  }
}


export default App;
