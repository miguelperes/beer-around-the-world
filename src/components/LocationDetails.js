import React, { Component } from "react";
import PropTypes from "prop-types";
import VenueDetailsHeader from "./VenueDetailsHeader";
import BreweryDetailsHeader from "./BreweryDetailsHeader";
import LocationDetailsBody from "./LocationDetailsBody";

class LocationDetails extends Component {
  render() {
    const { locationInfo, onClose, pinByVenues } = this.props;

    return (
      <div
        className={"w-100 h-100 bg-white overflow-hidden"}
        ref={node => (this.node = node)}
        onKeyDown={this.handleKeyDown}
        tabIndex={0}
      >
        {pinByVenues ? (
          <VenueDetailsHeader
            locationInfo={locationInfo.info}
            handleClose={onClose}
          />
        ) : (
          <BreweryDetailsHeader
            locationInfo={locationInfo.info}
            handleClose={onClose}
          />
        )}
        <hr className="black br1" />
        <LocationDetailsBody checkins={locationInfo.checkins} />
      </div>
    );
  }
}

LocationDetails.propTypes = {
  pinByVenues: PropTypes.bool,
  locationInfo: PropTypes.object,
  onClose: PropTypes.func
};

export default LocationDetails;
