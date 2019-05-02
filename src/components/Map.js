import React, { Component } from "react";
import PropTypes from "prop-types";
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

  getLastLocationCoord = (locations) => {
    const locationsLength = locations.length
    if(locationsLength > 1){
      const lastLocation = locations[locationsLength - 1]
      return {lat: lastLocation.lat, lng: lastLocation.lng}
    }

    return this.props.defaultCenter
  }
  
  render() {
    const { pinLocations } = this.props;

    return (
      // Important! Always set the container height explicitly
      <div className="vh-100 w-100 center">
        <GoogleMap
          ref={map => (this.map = map)}
          bootstrapURLKeys={{ key: googleMapsKey }}
          defaultCenter={this.props.center}
          center={this.getLastLocationCoord(pinLocations)}
          defaultZoom={this.props.zoom}
        >
          {pinLocations &&
            pinLocations.map((location, index) => (
              <Marker
                key={index}
                lat={location.lat}
                lng={location.lng}
                venueId={location.id}
                onClick={this.props.onMarkerClick}
              />
            ))}
        </GoogleMap>
      </div>
    );
  }
}

Map.propTypes = {
  pinLocations: PropTypes.array,
  onMarkerClick: PropTypes.func
};

export default Map;
