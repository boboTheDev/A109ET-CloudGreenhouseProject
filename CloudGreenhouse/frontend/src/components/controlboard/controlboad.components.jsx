import React from "react";
import { useSelector, useDispatch } from "react-redux/es/exports";
import Switch from "../../components/switch/switch.components";
import { storeCommand } from "../../redux/commandSlice";
import {
  led_toggle,
  fan_toggle,
  water_toggle,
  camera_toggle,
} from "../../redux/commandSlice";

import "./controlboard.styles.scss";

const Controlboard = () => {
  const commandState = useSelector((state) => state.command);
  const dispatch = useDispatch();

  return (
    <div className="controlboard">
      <div className="controlbox">
        <div className="header">
          <h1 className="title">FANS</h1>
        </div>
        <div className="button">
          <Switch
            isOn={commandState.fan_state}
            onColor={"#38FF93"}
            handleToggle={() => dispatch(fan_toggle())}
            id={"fan"}
          />
        </div>
      </div>

      <div className="controlbox">
        <div className="header">
          <h1 className="title">LIGHTS</h1>
        </div>
        <div className="button">
          <Switch
            isOn={commandState.led_state}
            onColor={"#38FF93"}
            handleToggle={() => dispatch(led_toggle())}
            id={"led"}
          />
        </div>
      </div>

      <div className="controlbox">
        <div className="header">
          <h1 className="title">IRRIGATION</h1>
        </div>
        <div className="button">
          <Switch
            isOn={commandState.water_state}
            onColor={"#38FF93"}
            handleToggle={() => dispatch(water_toggle())}
            id={"water"}
          />
        </div>
      </div>

      <div className="controlbox">
        <div className="header">
          <h1 className="title">CAMERA</h1>
        </div>
        <div className="button">
          <Switch
            isOn={commandState.camera_state}
            onColor={"#38FF93"}
            handleToggle={() => dispatch(camera_toggle())}
            id={"camera"}
          />
        </div>
      </div>

      <div className="controlbox">
        <button
          className="sendbutton"
          onClick={() => dispatch(storeCommand(commandState))}
          style={{ background: commandState.storecommand_state && "#38FF93" }}
        >
          COMMAND
        </button>
      </div>
    </div>
  );
};

export default Controlboard;
