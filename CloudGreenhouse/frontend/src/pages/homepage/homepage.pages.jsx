import React from "react";
// import { useSelector, useDispatch } from "react-redux/es/exports";

// import {
//   led_toggle,
//   fan_toggle,
//   water_toggle,
//   camera_toggle,
// } from "../../redux/commandSlice";

import Detailboxholder from "../../components/detailboxholder/detailboxholder.components";
import Controlboard from "../../components/controlboard/controlboad.components";
import LineChart from "../../components/linechart/linechart.components";

import "./homepage.styles.scss";
import { Line } from "react-chartjs-2";

const Homepage = () => {
  return (
    <div className="homepage">
      <Detailboxholder />
      <Controlboard />
      <LineChart />
    </div>
  );
};

export default Homepage;
