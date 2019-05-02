import React, { Component } from "react";
import "../App.css";
import Map from "./Map";
import LocationDetails from "./LocationDetails";
import Modal from "./Modal";

import queryString from "query-string";

import { getUserInfo, getCheckins, AUTH_URL } from "../utils/untappdAPI";

import {
  organizeByBreweries,
  organizeVenues,
  concatVenues,
  getSideMenuWidth,
  concatBreweries
} from "../utils/checkinsHandler";

import SearchBar from "./SearchBar";
import SideMenu from "./SideMenu";

class Main extends Component {
  constructor() {
    super();

    this.state = {
      token: null,
      username: "Untappd username",
      loggedUser: null,
      userData: {},
      venuesInfo: {},
      breweriesInfo: {},
      selectedLocation: null,
      pinByVenues: false,
      checkinRequestError: false,
      loadingCheckins: false,
      showLocationDetails: false
    };
  }

  async componentDidMount() {
    const { access_token } = queryString.parse(this.props.location.hash);
    if (access_token) {
      const userInfo = await getUserInfo(access_token);
      this.setState({ token: access_token, loggedUser: userInfo });
    }
  }

  handleSubmit = async username => {
    const { token, userData } = this.state;

    if (userData[username]) {
      this.setState({ venuesInfo: userData[username].venuesInfo });
    } else {
      this.setState({ loadingCheckins: true, checkinRequestError: false });

      const checkinsRequest = await getCheckins(username, token);

      if (checkinsRequest) {
        const { checkins, nextPageUrl } = checkinsRequest;

        this.setUserBreweries(username, organizeByBreweries(checkins))
        this.setUserVenues(username, organizeVenues(checkins));
        this.getNextCheckins(19, nextPageUrl, token); // Get more 950 checkins
      } else {
        this.setState({ checkinRequestError: true, loadingCheckins: false });
      }
    }
  };

  selectPin = location_id =>
    this.setState({ selectedLocation: location_id, showLocationDetails: true });

  closeLocationDetails = () => this.setState({ showLocationDetails: false });

  setUserVenues = (username, venues) => {
    this.setState((prevState) => {
      const userData = { ...prevState.userData };
      userData[username] = { ...userData[username], venuesInfo: venues };

      return { userData: userData, venuesInfo: venues };
    });
  };

  setUserBreweries = (username, breweries) => {
    this.setState((prevState) => {
      const userData = { ...prevState.userData };
      userData[username] = { ...userData[username], breweriesInfo: breweries };

      return { userData: userData, breweriesInfo: breweries };
    });
  }

  logout = () => {
    this.setState({
      token: null,
      loggedUser: null,
      venuesInfo: []
    });
  };

  // TODO: move to untappdAPI file?
  async getNextCheckins(pagesNumber, nextPageUrl, token) {
    let venues = this.state.venuesInfo;
    let breweries = this.state.breweriesInfo;
    let nextUrl = nextPageUrl;

    while (pagesNumber > 0 && nextUrl !== "") {
      const pageResult = await getCheckins(this.state.username, token, nextUrl);

      if (!pageResult) break; // If searchinng another user, shows only up to 300 checkins
      
      nextUrl = pageResult.nextPageUrl;

      const resultByVenues = organizeVenues(pageResult.checkins);
      venues = concatVenues(venues, resultByVenues);
      this.setState({ venuesInfo: venues });

      const resultByBreweries = organizeByBreweries(pageResult.checkins);
      breweries = concatBreweries(breweries, resultByBreweries);
      this.setState({ breweriesInfo: breweries });

      pagesNumber--;
    }

    this.setUserVenues(this.state.username, venues);
    this.setUserBreweries(this.state.username, breweries);
    this.setState({ loadingCheckins: false });
  }

  render() {
    const {
      venuesInfo,
      breweriesInfo,
      pinByVenues,
      showLocationDetails,
      selectedLocation,
      loadingCheckins
    } = this.state;

    const locations = pinByVenues ? venuesInfo : breweriesInfo
    const pinLocations = Object.entries(locations).map(([key, data]) => ({
      lat: data.info.location.lat,
      lng: data.info.location.lng,
      id: key
    }));

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
                href={AUTH_URL}
              >
                Login
              </a>
            )}

            {this.state.token !== null && (
              <SearchBar
                handleSubmit={this.handleSubmit}
                isLoading={loadingCheckins}
              />
            )}

            {this.state.checkinRequestError && (
              <div className="center f7 f6-l dark-red mt1">
                (Error: Unable to get checkins)
              </div>
            )}
          </div>
        </div>

        <SideMenu
          userInfo={this.state.loggedUser}
          onLogout={this.logout}
          width={getSideMenuWidth()}
        />

        <Modal
          display={showLocationDetails}
          onClose={this.closeLocationDetails}
        >
          <LocationDetails
            locationInfo={locations[selectedLocation]}
            pinByVenues={pinByVenues}
            onClose={this.closeLocationDetails}
          />
        </Modal>

        <div className="h-100 w-100">
          <Map pinLocations={pinLocations} onMarkerClick={this.selectPin} />
        </div>
      </div>
    );
  }
}

export default Main;
