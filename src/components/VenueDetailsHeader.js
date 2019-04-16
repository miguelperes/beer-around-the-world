import React from "react";
import PropTypes from "prop-types";
import CloseButton from "./CloseButton";

const VenueDetailsHeader = ({ venueInfo, handleClose }) => {
  const { venue_name, venue_icon, location } = venueInfo;

  return (
    <header className="flex justify-center items-center">
      <img className="mv2 mr1" src={venue_icon.sm} alt="Venue Icon" />
      <div className="w-75 flex flex-column">
        <span className="w-100 tc f3-ns f2-l b">{venue_name}</span>
        <span className="w-100 tc f7 mv1">
          {location.venue_city} - {location.venue_state} -{" "}
          {location.venue_country}
        </span>
      </div>
      <CloseButton handleClick={handleClose}/>
    </header>
  );
};

VenueDetailsHeader.propTypes = {
  venueInfo: PropTypes.object.isRequired,
  handleClose: PropTypes.func
};

export default VenueDetailsHeader;
