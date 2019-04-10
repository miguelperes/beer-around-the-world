import React from "react";
import PropTypes from "prop-types";

const VenueDetailsHeader = ({ venueInfo }) => {
  const { venue_name, venue_icon, location } = venueInfo;

  return (
    <header className="flex justify-center items-center">
      <img className="mt2 mr4" src={venue_icon.sm} alt="Venue Icon" />
      <div className="w-75 flex flex-column">
        <p className="w-100 tc f3 mv3">{venue_name}</p>
        <p className="w-100 tc f7">
          {location.venue_city} - {location.venue_state} -{" "}
          {location.venue_country}
        </p>
      </div>
    </header>
  );
};

VenueDetailsHeader.propTypes = {
  venueInfo: PropTypes.object.isRequired
};

export default VenueDetailsHeader;
