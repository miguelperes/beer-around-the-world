import React from "react";
import PropTypes from "prop-types";

const VenueDetailsHeader = ({ venueInfo }) => {
  const { venue_name, venue_icon, location } = venueInfo;

  return (
    <header className="flex justify-center items-center">
      <img className="mv2 mr1" src={venue_icon.sm} alt="Venue Icon" />
      <div className="w-75 flex flex-column">
        <span className="w-100 tc f2">{venue_name}</span>
        <span className="w-100 tc f7 mv1">
          {location.venue_city} - {location.venue_state} -{" "}
          {location.venue_country}
        </span>
      </div>
    </header>
  );
};

VenueDetailsHeader.propTypes = {
  venueInfo: PropTypes.object.isRequired
};

export default VenueDetailsHeader;
