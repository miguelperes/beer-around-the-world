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
      username: "Untappd username",
      checkins: []
    };
  }

  handleClick = event => {
    event.preventDefault();
    axios
      .get(
        `https://api.untappd.com/v4/user/checkins/${
          this.state.username
        }?client_id=${untappdId}&client_secret=${untappdKey}`
      )
      .then(response => {
        console.log("response", response);
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
    const markers = this.getLocations(this.state.checkins);

    return (
      <div className="flex flex-column mr1 ml1">
        <div className="f2 center">Beer Around the World!</div>

        <form className="center mv2" onSubmit={this.handleClick}>
          <input
            type="text"
            value={this.state.username}
            onChange={event => this.setState({ username: event.target.value })}
            onFocus={() => this.setState({ username: "" })}
          />
          <button className="ml2" onClick={this.handleClick}>
            Find Beers!
          </button>
        </form>

        <div className="h-50">
          <Map markers={markers} />
        </div>
      </div>
    );
  }
}

export default App;
