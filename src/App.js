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
      checkins: [],
      checkinRequestError: false
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
      .then(
        response => {
          this.setState({ checkins: response.data.response.checkins.items });
        },
        error => {
          console.log(error.response);
          this.setState({ checkinRequestError: true });
        }
      );
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

        <form className="center mt2" onSubmit={this.handleClick}>
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

        {this.state.checkinRequestError && (
          <div className="center f7 dark-red mt1">
            (Error: Unable to get checkins)
          </div>
        )}

        <div className="h-50 mt3">
          <Map markers={markers} />
        </div>
      </div>
    );
  }
}

export default App;
