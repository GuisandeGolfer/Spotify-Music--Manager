import React, { Component } from "react";
import SpotifyData from "./components/SpotifyData.js";
import UserInfo from "./components/UserInfo.js";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: "",
      device: ""
    };
  }

  render() {
    return (
      <div className="App">
        <UserInfo />
        <SpotifyData />
      </div>
    );
  }
}

export default App;
