import React, { Component } from "react";
import PropTypes from "prop-types";
// import GoogleMap from "google-map-react";
// import marker from "../images/marker.png";
import blueMarker from "../images/marker_blue.png";
import { Map, Marker } from "pigeon-maps"

// const googleMapsKey = process.env.REACT_APP_GOOGLE_MAPS_KEY;

// const markerOffset = { transform: "translate(-50%, -100%)" };
// const Marker = ({ onClick, venueId, pinType }) => (
//   <img
//     style={markerOffset}
//     src={pinType ? marker : blueMarker}
//     alt="Map Marker"
//     onClick={() => onClick(venueId)}
//   />
// );

class PigeonMap extends Component {
  static defaultProps = {
    center: [-22.906847, -43.172897],
    zoom: 0
  };

  getLastLocationCoord = (locations) => {
    const locationsLength = locations && locations.length
    if (locationsLength >= 1) {
      const lastLocation = locations[locationsLength - 1]
      return [lastLocation.lat, lastLocation.lng]
    }

    return this.props.defaultCenter
  }

  render() {
    const { pinLocations, pinType } = this.props;
    // const hue = 0
    // const color = `hsl(${hue % 360}deg 39% 70%)`

    return (
      <div className="vh-100 w-100 center">
        <Map defaultCenter={this.getLastLocationCoord(null)} defaultZoom={3}>
        {pinLocations &&
            pinLocations.map((location, index) => (
              <Marker
                key={index}
                anchor={[location.lat, location.lng]}
                // venueId={location.id}
                // pinType={pinType}
                // onClick={this.props.onMarkerClick}
              />
        ))}
          {/* <Marker
            width={50}
            anchor={[50.879, 4.6997]}
            // color={color}
            onClick={() => console.log("click")}
          /> */}
        </Map>
        {/* <GoogleMap
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
                pinType={pinType}
                onClick={this.props.onMarkerClick}
              />
            ))}
        </GoogleMap> */}
      </div>
    );
  }
}

PigeonMap.propTypes = {
  pinLocations: PropTypes.array,
  pinType: PropTypes.bool,
  onMarkerClick: PropTypes.func
};

export default PigeonMap;
