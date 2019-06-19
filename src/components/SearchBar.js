import React, { Component } from "react";
import PropTypes from "prop-types";

import ReactLoading from "react-loading";

class SearchBar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: "Untappd username",
    }
  }

  onChange = event => this.setState({ username: event.target.value })

  onFocus = () => this.setState({ username: "" })

  onSubmit = event => {
    event.preventDefault()
    this.props.handleSubmit(this.state.username)
  }

  render() {
    const { isLoading, style, buttonStyle } = this.props

    return (
      <div className={`flex flex-row justify-start ${style}`}>
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            className="ba b--black-20 pa1 mb1"
            value={this.state.username}
            onChange={this.onChange}
            onFocus={this.onFocus}
          />
          <button
            className={`ml2 f7-ns f6-l link dim br2 ph3 pv2 mb2 dib white bn bg-black ${buttonStyle}`}
            onClick={this.onSubmit}
          >
            Find Beers!
          </button>
        </form>

        {isLoading && (
          <ReactLoading
            className="ml2 self-start"
            type="spin"
            color="#ffff00"
            height={30}
            width={30}
          />
        )}
      </div>
    );
  }
}

SearchBar.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired
};

export default SearchBar;
