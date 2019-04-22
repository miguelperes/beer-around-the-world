import React, { Component } from "react";
// import PropTypes from "prop-types";
import GoogleMap from "google-map-react";
import marker from "../images/marker.png";

const googleMapsKey = process.env.REACT_APP_GOOGLE_MAPS_KEY;

const markerOffset = { transform: "translate(-50%, -100%)" };
const Marker = ({ onClick, venueId }) => (
  <img
    style={markerOffset}
    src={marker}
    alt="Map Marker"
    onClick={() => onClick(venueId)}
  />
);

class Map extends Component {
  static defaultProps = {
    center: { lat: -22.906847, lng: -43.172897 },
    zoom: 0
  };
  
  render() {
    const { venues } = this.props;
    const locations = Object.entries(venues).map(([id, data], index) => ({
      lat: data.venueInfo.location.lat,
      lng: data.venueInfo.location.lng,
      venueId: data.venueInfo.venue_id
    }));

    return (
      // Important! Always set the container height explicitly
      <div className="vh-100 w-100 center">
        <GoogleMap
          ref={map => (this.map = map)}
          bootstrapURLKeys={{ key: googleMapsKey }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          {venues &&
            locations.map((location, index) => (
              <Marker
                key={index}
                lat={location.lat}
                lng={location.lng}
                venueId={location.venueId}
                onClick={this.props.onMarkerClick}
              />
            ))}
        </GoogleMap>
      </div>
    );
  }
}

// TODO
// Map.propTypes = {};

export default Map;
