import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props){
    super(props);
    this.state = {
      rooms: []
    }
    this.roomsRef = this.props.firebase.database().ref('Rooms');
  }

componentDidMount() {
  this.roomsRef.on('child_added', snapshot => {
    const room = snapshot.val();
    room.key = snapshot.key;
    console.log('rooms mounting');
    this.setState({ rooms: this.state.rooms.concat( room ) })
  });
}

handleChangeRoomName = (e) => { // new method to handle room name change when user inputs the field. Accepts event data.
  this.setState({ newRoom: e.target.value }); // Updates room list with new room name.
}

handleSubmit = (newRoom) => { // new method to handle when a new room item is added when user clicks button. Accepts event data.
  this.roomsRef.push({ // method used in firebase to add an item to a location.
    name: newRoom
  });
  this.setState({ newRoom: "" }); // Updates room list with new room item, if empty leaves field blank.
}

render() {
  return (
      <section className="rooms">
         {this.state.rooms.map( (room,index) =>
          <li>
            <button className="roomName" onClick={ () => this.props.isActiveRoom(room)}>{room.name}</button>
          </li>)}
          <form id="createRoomForm" onSubmit={ (e) => { e.preventDefault(); this.handleSubmit(this.state.newRoom) } }>
            <input type="text" value={ this.state.newRoom } onChange={ this.handleChangeRoomName} placeholder="Create a new room" />
            <button>Submit</button>
          </form>
       </section>
  );
}
}

export default RoomList;
