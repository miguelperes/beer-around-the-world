import React, { Component } from "react";
import PropTypes from "prop-types";
import VenueDetailsHeader from "./VenueDetailsHeader";

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
        <VenueDetailsHeader venueInfo={venueInfo.venueInfo}/>

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
