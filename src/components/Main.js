import React, { Component } from "react";
import "../App.css";
import Map from "./Map";
import VenueDetails from "./VenueDetails";
import Modal from "./Modal";

import ReactLoading from "react-loading";
import queryString from "query-string";

import { getCheckins } from "../utils/untappdAPI";
import { organizeVenues, concatVenues } from "../utils/utility";

const untappdId = process.env.REACT_APP_UNTAPPD_ID;

class Main extends Component {
  constructor() {
    super();

    this.state = {
      token: null,
      username: "Untappd username",
      userData: {},
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
    const { username, token, userData } = this.state;

    if (userData[username]) {
      this.setState({ venuesInfo: userData[username].venuesInfo });
    } else {
      this.setState({ loadingCheckins: true, checkinRequestError: false });

      const checkinsRequest = await getCheckins(username, token);

      if (checkinsRequest) {
        const { checkins, nextPageUrl } = checkinsRequest;
        this.setUserVenues(username, organizeVenues(checkins))
        
        this.setState({loadingCheckins: false});

        this.getNextCheckins(3, nextPageUrl, token); // Get more 150 checkins
      } else {
        this.setState({ checkinRequestError: true, loadingCheckins: false });
      }
    }
  };

  selectVenue = venue =>
    this.setState({ selectedVenue: venue, showVenue: true });

  closeVenueDetails = () => this.setState({ showVenue: false });

  setUserVenues = (username, venues) => {
    this.setState((prevState, props) => {
      const userData = { ...prevState.userData };
      userData[username] = {venuesInfo: venues}
      
      return {userData: userData, venuesInfo: venues}
    });
  }

  // TODO: move to untappdAPI file?
  async getNextCheckins(pagesNumber, nextPageUrl, token) {
    let venues = this.state.venuesInfo;
    let nextUrl = nextPageUrl;

    while (pagesNumber > 0 && nextUrl !== "") {
      const pageResult = await getCheckins(this.state.username, token, nextUrl);
      const formattedResult = organizeVenues(pageResult.checkins);
      nextUrl = pageResult.nextPageUrl;

      venues = concatVenues(venues, formattedResult);
      this.setState({ venuesInfo: venues });

      pagesNumber--;
    }

    this.setUserVenues(this.state.username, venues)
  }

  render() {
    const { venuesInfo, showVenue, selectedVenue } = this.state;

    return (
      <div className="flex flex-column">
        <div className="absolute z-1 w-100 flex">
          <div className="Main-search-bar pa3 tc">
            <div className="Main-search-bar-title tc f2-l f4">
              Beer Around the World!
            </div>

            {this.state.token === null && (
              <a
                className="f7 link dim br2 ph3 pv2 mb2 dib white bg-black"
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
                  <button
                    className="ml2 f7-ns f6-l link dim br2 ph3 pv2 mb2 dib white bn bg-black"
                    onClick={this.handleClick}
                  >
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
              <div className="center f7 f6-l dark-red mt1">
                (Error: Unable to get checkins)
              </div>
            )}
          </div>
        </div>

        <Modal
          display={showVenue}
          venueInfo={venuesInfo[selectedVenue]}
          onClose={this.closeVenueDetails}
        >
          <VenueDetails
            venueInfo={venuesInfo[selectedVenue]}
            onClose={this.closeVenueDetails}
          />
        </Modal>

        <div className="h-100 w-100">
          <Map venues={venuesInfo} onMarkerClick={this.selectVenue} />
        </div>
      </div>
    );
  }
}

export default Main;
