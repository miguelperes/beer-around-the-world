import React, { Component } from "react";
import "./App.css";
import Map from "./Map";
import axios from "axios";
import ReactLoading from "react-loading";
import queryString from "query-string";

const untappdId = process.env.REACT_APP_UNTAPPD_ID;

class Main extends Component {
  constructor() {
    super();

    this.state = {
      username: "Untappd username",
      checkins: [],
      checkinRequestError: false,
      loadingCheckins: false,
      token: null
    };
  }

  componentDidMount() {
    const { access_token } = queryString.parse(this.props.location.hash);

    if (access_token) this.setState({ token: access_token });
  }

  handleClick = event => {
    event.preventDefault();
    this.setState({ loadingCheckins: true, checkinRequestError: false });
    axios
      .get(
        `https://api.untappd.com/v4/user/checkins/${
          this.state.username
        }?access_token=${this.state.token}&limit=50`
      )
      .then(
        response => {
          this.setState({ checkins: response.data.response.checkins.items });
          this.setState({ loadingCheckins: false });
        },
        error => {
          console.log(error.response);
          this.setState({ checkinRequestError: true });
          this.setState({ loadingCheckins: false });
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

        {this.state.token === null && (
          <button className="ml2 mv2 w-10 center">
            <a
              href={`https://untappd.com/oauth/authenticate/?client_id=${untappdId}&response_type=token&redirect_url=https://beer-around-the-world.herokuapp.com/`}
            >
              Login
            </a>
          </button>
        )}

        {this.state.token !== null &&
        <div className="flex flex-row justify-center items-center center mt2">
          <form className="center" onSubmit={this.handleClick}>
            <input
              type="text"
              value={this.state.username}
              onChange={event =>
                this.setState({ username: event.target.value })
              }
              onFocus={() => this.setState({ username: "" })}
            />
          </form>

          <button className="ml2" onClick={this.handleClick}>
            Find Beers!
          </button>

          {this.state.loadingCheckins && (
            <ReactLoading
              className="ml2"
              type="spin"
              color="#ffff00"
              height={25}
              width={25}
            />
          )}
        </div>
        }
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

export default Main;
