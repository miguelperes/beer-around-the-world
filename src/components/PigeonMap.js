import React, { Component } from "react";
import PropTypes from "prop-types";
import { Map, Marker } from "pigeon-maps"

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
    const { pinLocations, pinByVenues } = this.props;
    const venueColor = `rgb(0 0 0)`
    const brewerieColor = `rgb(239,194,12)`

    return (
      <div className="vh-100 w-100 center">
        <Map defaultCenter={this.getLastLocationCoord(null)} defaultZoom={3}>
        {pinLocations &&
            pinLocations.map((location, index) => (
              <Marker
                key={index}
                anchor={[location.lat, location.lng]}
                venueId={location.id}
                color={pinByVenues ? venueColor : brewerieColor}
                onClick={() => this.props.onMarkerClick(location.id)}
              />
        ))}
        </Map>
      </div>
    );
  }
}

PigeonMap.propTypes = {
  pinLocations: PropTypes.array,
  pinByVenues: PropTypes.bool,
  onMarkerClick: PropTypes.func
};

export default PigeonMap;
