import React, { Component } from "react";
import PropTypes from "prop-types";

class Modal extends Component {
  handleClick = event => {
    if (this.props.display && !this.node.contains(event.target)) {
      this.props.onClose();
    }
  };

  handleKeyDown = event => {
    if (event.key === "Escape") {
      this.props.onClose();
    }
  };

  componentWillMount() {
    document.addEventListener("mousedown", this.handleClick);
    document.addEventListener("touchstart", this.handleClick);
  }

  componentDidUpdate() {
    this.node && this.node.focus();
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClick);
    document.removeEventListener("touchstart", this.handleClick);
  }

  render() {
    if (this.props.display) {
      return (
        <div
          className={
            "absolute absolute-fill w-100 w-40-l w-60-m h-75 h-50-l h-50-m ml-auto mr-auto z-999 bg-white outline-0 br2 overflow-hidden"
          }
          style={{
            transform: "translate(-50%, -50%)",
            top: "50%",
            left: "50%"
          }}
          ref={node => (this.node = node)}
          onKeyDown={this.handleKeyDown}
          tabIndex={0}
        >
          {this.props.children}
        </div>
      );
    }

    return null;
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired
};

export default Modal;
