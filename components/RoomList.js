import React, { Component } from 'react';

class Album extends Component {
  constructor(prop) {
    super(props) (
      
      this.state = {
        rooms: []
      };
      this.roomsRef = this.props.firebase.database().ref('rooms');
    );

  }
}

export default App;
