import React, { Component } from "react";
import PropTypes from "prop-types";
import VenueDetailsHeader from "./VenueDetailsHeader";
import VenueDetailsBody from "./VenueDetailsBody";

class VenueDetails extends Component {
  render() {
    const { venueInfo, onClose } = this.props;

    return (
      <div
        className={"w-100 h-100 bg-white overflow-hidden"}
        ref={node => (this.node = node)}
        onKeyDown={this.handleKeyDown}
        tabIndex={0}
      >
        <VenueDetailsHeader
          venueInfo={venueInfo.venueInfo}
          handleClose={onClose}
        />
        <hr className="black br1" />
        <VenueDetailsBody checkins={venueInfo.checkins} />
      </div>
    );
  }
}

VenueDetails.propTypes = {
  venueInfo: PropTypes.object,
  onClose: PropTypes.func
};

export default VenueDetails;
