import React, { Component } from 'react';

class User extends Component {

signIn = () => {
  const provider = new this.props.firebase.auth.GoogleAuthProvider();
  this.props.firebase.auth().signInWithPopup(provider);
}

signOut = () => {
  this.props.firebase.auth().signOut();
}

componentDidMount() {
  this.props.firebase.auth().onAuthStateChanged( user => {
    this.props.setUser(user);
  });
}

  render() {
    return (
      <div className="login-menu">
        <p className="user-display-name">{this.props.activeUser ? "Display name: " + this.props.activeUser.displayName : "Guest"}</p>
        <button className="signInButton" onClick={() => this.signIn()}>Sign in</button>
        <button className="signOutButton" onClick={() => this.signOut()}>Sign out</button> 
      </div>
    );
  }
}

export default User;
