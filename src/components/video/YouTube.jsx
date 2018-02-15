import React from "react";
import PropTypes from "prop-types";

class YouTube extends React.Component {
  render() {
    let { url, width, height } = this.props;
    if (url.includes("http")) {
      url = url.split("v=")[1];
    }
    return (
      <iframe
        width={width}
        height={height}
        src={`https://www.youtube.com/embed/${url}?rel=0&amp;showinfo=0`}
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen
      />
    );
  }
}

YouTube.propTypes = {
  url: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string
};

YouTube.defaultProps = {
  url: "",
  width: "560",
  height: "315"
};

export default YouTube;
