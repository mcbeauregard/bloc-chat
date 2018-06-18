import React, { Component } from 'react';
import * as firebase from 'firebase';
import './App.css';
import RoomList from './components/RoomList';

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
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Bloc Chat</h1>
        <nav>
        <div className="topbar">
          <span to='/RoomList'>Chat Rooms</span>
          <main>
            <RoomList firebase={firebase}/>
          </main>
        </div>
        </nav>
        </header>
      </div>
    );
  }
}



export default App;
