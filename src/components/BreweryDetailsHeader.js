import React from "react";
import PropTypes from "prop-types";
import CloseButton from "./CloseButton";

const BreweryDetailsHeader = ({ locationInfo, handleClose }) => {
  const { brewery_name, brewery_label, location } = locationInfo;


  return (
    <header className="flex justify-center items-center">
      <img className="mv2 mr1" src={brewery_label} alt="brewery Icon" />
      <div className="w-75 flex flex-column">
        <span className="w-100 tc f3-ns f2-l b">{brewery_name}</span>
        <span className="w-100 tc f7 mv1">
          {location.brewery_city} - {location.brewery_state} -{" "}
          {location.brewery_country}
        </span>
      </div>
      <CloseButton handleClick={handleClose} />
    </header>
  );
};

BreweryDetailsHeader.propTypes = {
  locationInfo: PropTypes.object.isRequired,
  handleClose: PropTypes.func
};

export default BreweryDetailsHeader;
