import React, { Component } from "react";
import "../App.css";
import Map from "./Map";
import VenueDetails from "./VenueDetails";
import Modal from "./Modal";

import queryString from "query-string";

import { getUserInfo, getCheckins, AUTH_URL } from "../utils/untappdAPI";
import { organizeVenues, concatVenues } from "../utils/utility";
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
      venuesInfo: [],
      selectedVenue: null,
      checkinRequestError: false,
      loadingCheckins: false,
      showVenue: false
    };
  }

  async componentDidMount() {
    const { access_token } = queryString.parse(this.props.location.hash);
    if (access_token) {
      const userInfo = await getUserInfo(access_token)
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
        this.setUserVenues(username, organizeVenues(checkins));
        this.getNextCheckins(19, nextPageUrl, token); // Get more 950 checkins

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
      userData[username] = { venuesInfo: venues };

      return { userData: userData, venuesInfo: venues };
    });
  };

  logout = () => {
    this.setState({
      token: null,
      loggedUser: null,
      venuesInfo: []
    })
  }

  // TODO: move to untappdAPI file?
  async getNextCheckins(pagesNumber, nextPageUrl, token) {
    let venues = this.state.venuesInfo;
    let nextUrl = nextPageUrl;

    while (pagesNumber > 0 && nextUrl !== "") {
      const pageResult = await getCheckins(this.state.username, token, nextUrl);
      
      if(!pageResult) break // If searchinng another user, shows only up to 300 checkins

      const formattedResult = organizeVenues(pageResult.checkins);
      nextUrl = pageResult.nextPageUrl;

      venues = concatVenues(venues, formattedResult);
      this.setState({ venuesInfo: venues });

      pagesNumber--;
    }

    this.setUserVenues(this.state.username, venues);
    this.setState({ loadingCheckins: false });
  }

  render() {
    const {
      venuesInfo,
      showVenue,
      selectedVenue,
      loadingCheckins
    } = this.state;

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

        <SideMenu userInfo={this.state.loggedUser} onLogout={this.logout} width={"30%"}/>

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
