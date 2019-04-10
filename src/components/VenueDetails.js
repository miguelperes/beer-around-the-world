import React, { Component } from "react";
import PropTypes from "prop-types";

class VenueDetails extends Component {
  handleClick = event => {
    if (this.props.display && !this.node.contains(event.target)) {
      this.props.onClose();
    }
  };

  handleKeyDown = event => {
    if(event.key === "Escape") {
      this.props.onClose();
    }
  }

  componentWillMount() {
    document.addEventListener("mousedown", this.handleClick);
  }

  componentDidUpdate() {
    this.node && this.node.focus()
  }  

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClick);
  }

  render() {
    const { venueInfo, display } = this.props;

    if (display) {
      return (
        <div
          className={
            "absolute absolute-fill w-75 h-50 ml-auto mr-auto z-999 bg-white outline-0"
          }
          style={{
            transform: "translate(-50%, -50%)",
            top: "50%",
            left: "50%"
          }}
          ref={node => (this.node = node)}
          onKeyDown={this.handleKeyDown}
          tabIndex={0}
        >
          <header className="flex justify-center items-center">
            <img
              className="mt2 mr4"
              src={venueInfo.venueInfo.venue_icon.sm}
              alt="Venue Icon"
            />
            <div className="w-75 flex flex-column">
              <p className="w-100 tc f3 mv3">
                {venueInfo.venueInfo.venue_name}
              </p>
              <p className="w-100 tc f7">
                {venueInfo.venueInfo.location.venue_city} -{" "}
                {venueInfo.venueInfo.location.venue_state} -{" "}
                {venueInfo.venueInfo.location.venue_country}
              </p>
            </div>
          </header>

          <span>Checkins:</span>
          <div className="ml1">
            {venueInfo.checkins.map((checkin, index) => (
              <div className="mv2" key={index}>
                {checkin.beer.beer_name} - {checkin.beer.beer_style} -{" "}
                {checkin.rating_score}/5 - {checkin.created_at}
              </div>
            ))}
          </div>
        </div>
      );
    }

    return null;
  }
}

VenueDetails.propTypes = {
  display: PropTypes.bool.isRequired,
  venueInfo: PropTypes.object,
  onClose: PropTypes.func.isRequired
};

export default VenueDetails;
