import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux/es/exports";

import { fetchDetail } from "../../redux/detailSlice";
import Detailbox from "../detailbox/detailbox.components";

import "./detailboxholder.styles.scss";

const Detailboxholder = () => {
  const detailState = useSelector((state) => state.detail);
  const dispatch = useDispatch();
  useEffect(() => {
    //dispatch async action here
    dispatch(fetchDetail());
    const interval = setInterval(() => {
      dispatch(fetchDetail());
    }, 30000);
    return () => clearInterval(interval);
  }, []); //empty array is for dependency

  return (
    <div className="detailboxholder">
      <Detailbox
        value={detailState.data.temperature + " °C"}
        title={"temperature"}
      />
      <Detailbox value={detailState.data.humidity + " %"} title={"humidity"} />
      <Detailbox
        value={detailState.data.soil_moisture + " %"}
        title={"soil moisture"}
      />
      <Detailbox value={detailState.data.lighting + " %"} title={"lighting"} />
      <Detailbox
        value={detailState.data.water_tank + " %"}
        title={"water tank"}
      />
    </div>
  );
};

export default Detailboxholder;
