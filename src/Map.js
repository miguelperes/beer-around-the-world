import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import marker from "./marker.png";

const googleMapsKey = process.env.REACT_APP_GOOGLE_MAPS_KEY;

const markerOffset = {transform: 'translate(-50%, -100%)'}
const Marker = () => <img style={markerOffset} src={marker} alt='Map Marker' />;

export default class Map extends Component {
  static defaultProps = {
    center: { lat: -22.906847, lng: -43.172897 },
    zoom: 7
  };

  render() {
    const { markers } = this.props;

    return (
      // Important! Always set the container height explicitly
      <div className='vh-75 w-100 center'>
        <GoogleMapReact
          bootstrapURLKeys={{ key: googleMapsKey }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          {markers.map((marker, index) => (
            <Marker key={index} lat={marker.lat} lng={marker.lng} />
          ))}
        </GoogleMapReact>
      </div>
    );
  }
}
