import React, { Component } from "react";
import "../App.css";
import Map from "./Map";
import VenueDetails from "./VenueDetails";

import ReactLoading from "react-loading";
import queryString from "query-string";

import { fetchUserCheckins } from "../utils/untappdAPI";
import { organizeVenues } from "../utils/utility";

const untappdId = process.env.REACT_APP_UNTAPPD_ID;

class Main extends Component {
  constructor() {
    super();

    this.state = {
      token: null,
      username: "Untappd username",
      venuesInfo: [],
      selectedVenue: null,
      checkinRequestError: false,
      loadingCheckins: false,
      showVenue: false
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
        loadingCheckins: false
      })
      : this.setState({ checkinRequestError: true, loadingCheckins: false });
  };

  selectVenue = venue =>
    this.setState({ selectedVenue: venue, showVenue: true });

  closeVenueDetails = () => this.setState({ showVenue: false });

  render() {
    const { venuesInfo, showVenue, selectedVenue } = this.state;

    return (
      <div className="flex flex-column">
        <div className="absolute z-1 w-100 flex">
          <div className="Main-search-bar pa3 tc">
            <div className="f2 tc Main-search-bar-title">Beer Around the World!</div>

            {this.state.token === null && (
              <a className="f6 link dim br2 ph3 pv2 mb2 dib white bg-black"
                href={`https://untappd.com/oauth/authenticate/?client_id=${untappdId}&response_type=token&redirect_url=https://beer-around-the-world.herokuapp.com/`}
              >
                Login
              </a>
            )}

            {this.state.token !== null && (
              <div className="flex flex-row justify-center items-center center mt2">
                <form className="center" onSubmit={this.handleClick}>
                  <input
                    type="text"
                    className="ba b--black-20 pa1 mb1"
                    value={this.state.username}
                    onChange={event =>
                      this.setState({ username: event.target.value })
                    }
                    onFocus={() => this.setState({ username: "" })}
                  />
                  <button className="ml2 f6 link dim br2 ph3 pv2 mb2 dib white bn bg-black"
                    onClick={this.handleClick}>
                    Find Beers!
                  </button>
                </form>

                {this.state.loadingCheckins && (
                  <ReactLoading
                    className="ml2 self-start"
                    type="spin"
                    color="#ffff00"
                    height={30}
                    width={30}
                  />
                )}
              </div>
            )}
            {this.state.checkinRequestError && (
              <div className="center f7 dark-red mt1">
                (Error: Unable to get checkins)
            </div>
            )}
          </div>
        </div>

        <VenueDetails
          display={showVenue}
          venueInfo={venuesInfo[selectedVenue]}
          onClose={this.closeVenueDetails}
        />

        <div className="h-100 w-100">
          <Map venues={venuesInfo} onMarkerClick={this.selectVenue} />
        </div>
      </div>
    );
  }
}

export default Main;
