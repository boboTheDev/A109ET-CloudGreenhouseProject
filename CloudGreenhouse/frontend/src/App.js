import { Routes, Route } from "react-router-dom";
import React from "react";
import Homepage from "./pages/homepage/homepage.pages";
import Header from "./components/header/header.component";
import "./App.css";

class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} />
        </Routes>
      </div>
    );
  }
}

export default App;
