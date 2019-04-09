import React, { Component } from "react";
import "../App.css";
import Map from "./Map";

import ReactLoading from "react-loading";
import queryString from "query-string";

import { fetchUserCheckins } from "../utils/untappdAPI";
import { organizeVenues } from "../utils/utility";

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

  handleClick = async event => {
    event.preventDefault();

    this.setState({ loadingCheckins: true, checkinRequestError: false });
    const checkins = await fetchUserCheckins(
      this.state.username,
      this.state.token
    );

    checkins
      ? this.setState({
          venuesInfo: organizeVenues(checkins),
          checkins: checkins,
          loadingCheckins: false
        })
      : this.setState({ checkinRequestError: true, loadingCheckins: false });
  };

  render() {
    const { venuesInfo } = this.state;

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

        {this.state.token !== null && (
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
        )}
        {this.state.checkinRequestError && (
          <div className="center f7 dark-red mt1">
            (Error: Unable to get checkins)
          </div>
        )}

        <div className="h-50 mt3">
          <Map venues={venuesInfo} />
        </div>
      </div>
    );
  }
}

export default Main;
