import React, { Component } from 'react';

class User extends Component {

signIn = () => {
  const provider = new this.props.firebase.auth.GoogleAuthProvider();
  this.props.firebase.auth().signInWithPopup(provider);
}

signOut = () => {
  this.props.firebase.auth().signOutWithPopup();
}

render() {
  return (
    <section className="login-menu">
      <button className="sign-in-button" onClick={this.state.signIn}>'Sign in'</button>
      <button className="sign-out-button" onClick={this.state.signOut}>'Sign out'</button>
    </section>
  );
}
}

export default User;
