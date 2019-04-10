import React, { Component } from "react";
import PropTypes from "prop-types";
import VenueDetailsHeader from "./VenueDetailsHeader";
import VenueDetailsBody from "./VenueDetailsBody";

class VenueDetails extends Component {
  handleClick = event => {
    if (this.props.display && !this.node.contains(event.target)) {
      this.props.onClose();
    }
  };

  handleKeyDown = event => {
    if (event.key === "Escape") {
      this.props.onClose();
    }
  };

  componentWillMount() {
    document.addEventListener("mousedown", this.handleClick);
  }

  componentDidUpdate() {
    this.node && this.node.focus();
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
            "absolute absolute-fill w-60 h-50 ml-auto mr-auto z-999 bg-white outline-0 br2"
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
          <VenueDetailsHeader venueInfo={venueInfo.venueInfo} />
          <hr className="black br1"/>
          <VenueDetailsBody checkins={venueInfo.checkins} />
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
