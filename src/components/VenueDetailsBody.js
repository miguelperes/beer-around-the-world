import React, { Component } from "react";
import PropTypes from "prop-types";

class VenueDetailsBody extends Component {
  formatDate = dateString => {
    return new Date(dateString).toDateString();
  };

  render() {
    const { checkins } = this.props;

    return (
      <div className="ml1 overflow-y-scroll h-75">
        <span>Checkins:</span>
        {checkins.map((checkin, index) => (
          <div className="flex flex-row mv1" key={index}>
            <img
              className="db mw-15 h-auto"
              style={{maxWidth: "100px", maxHeight: "100px"}}
              src={checkin.beer.beer_label}
              alt="Beer Label"
            />
            <div className="mv2 ml2 flex flex-column" key={index}>
              <span className="f4 b">{checkin.beer.beer_name}</span>
              <span className="f5">
                Brewery: {checkin.brewery.brewery_name}
              </span>
              <span className="f5">Style: {checkin.beer.beer_style}</span>
              <span className="f5">Rating: {checkin.rating_score}/5</span>
              <span className="f5">
                Date: {this.formatDate(checkin.created_at)}
              </span>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

VenueDetailsBody.protoTypes = {
  checkins: PropTypes.array
};

export default VenueDetailsBody;
