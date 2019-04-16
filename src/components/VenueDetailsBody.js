import React, { Component } from "react";
import PropTypes from "prop-types";

class VenueDetailsBody extends Component {
  formatDate = dateString => {
    return new Date(dateString).toDateString();
  };

  render() {
    const { checkins } = this.props;

    return (
      <div className="ml1 mt1 overflow-y-scroll h-75">
        {checkins.map((checkin, index) => {
          const beer = checkin.beer;
          const brewery = checkin.brewery

          return (
            <div className="flex flex-row mv2 ml2" key={index}>
              <img
                className="db mw-15 h-auto"
                style={{ maxWidth: "100px", maxHeight: "100px" }}
                src={beer.beer_label}
                alt="Beer Label"
              />
              <div className="ml2 flex flex-column" key={index}>
                <span className="f4 b">{beer.beer_name}</span>
                <span className="f6 f5-l">
                  Brewery: {brewery.brewery_name} ({brewery.country_name})
                </span>
                <span className="f6 f5-l">Style: {beer.beer_style}</span>
                <span className="f6 f5-l">Rating: {checkin.rating_score}/5</span>
                <span className="f6 f5-l">
                  Date: {this.formatDate(checkin.created_at)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

VenueDetailsBody.protoTypes = {
  checkins: PropTypes.array
};

export default VenueDetailsBody;
