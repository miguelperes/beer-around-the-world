import React, { Component } from "react";
import "./App.css";
import Map from "./Map";
import axios from "axios";
import { checkins } from "./globals";

const untappdId = process.env.REACT_APP_UNTAPPD_ID;
const untappdKey = process.env.REACT_APP_UNTAPPD_KEY;

class App extends Component {
  constructor() {
    super();

    this.state = {
      checkins: ""
    };
  }

  handleClick = () => {
    axios
      .get(
        `https://api.untappd.com/v4/user/checkins/miguelpc?client_id=${untappdId}&client_secret=${untappdKey}`
      )
      .then(response => {
        this.setState({ checkins: response.data.response.checkins.items });
      });
  };

  getLocations = checkins => {
    return checkins
      .map(checkin => {
        if (checkin.venue !== [] && checkin.venue.location) {
          return {
            lat: checkin.venue.location.lat,
            lng: checkin.venue.location.lng
          };
        } else {
          return null;
        }
      })
      .filter(location => location != null);
  };

  render() {
    const markers = this.getLocations(checkins);

    return (
      <div>
        <div>BEER AROUND THE WORLD</div>
        <button onClick={this.handleClick}>Click Me</button>
        <div style={{ height: "100%", width: "100%" }}>
          <Map markers={markers} />
        </div>
      </div>
    );
  }
}

export default App;
