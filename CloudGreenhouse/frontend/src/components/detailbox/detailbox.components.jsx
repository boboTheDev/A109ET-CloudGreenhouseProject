import React from "react";

import "./detailbox.styles.scss";

const Detailbox = ({ value, title }) => (
  <div className="detailbox">
    <div className="value-holder">
      <h2 className="value">{value}</h2>
    </div>
    <div className="header">
      <h1 className="title">{title.toUpperCase()}</h1>
    </div>
  </div>
);

export default Detailbox;
