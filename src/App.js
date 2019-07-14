import React, { Component } from "react";
import SpotifyData from "./components/SpotifyData.js";
import UserInfo from "./components/UserInfo.js";
import queryString from "query-string";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: "",
      device: "",
      serverData: {}
    };
  }

  componentDidMount() {
    let parsed = queryString.parse(window.location.search);
    console.log(parsed);
    let accessToken = parsed.access_token;
    //use fetch() with the access_token
    fetch("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: "Bearer " + accessToken
      }
    })
      .then(response => response.json())
      .then(json => console.log(json))
      .catch(err => console.error(err));
  }

  render() {
    const { user, device, serverData } = this.state;
    return (
      <div className="App">
        {user ? (
          <div>
            <UserInfo username={user} device={device} />
            <SpotifyData serverData={serverData} />
          </div>
        ) : (
          <button
            style={{
              padding: "20px",
              "font-size": "50px",
              "margin-top": "20px"
            }}
            onClick={() => (window.location = "http://localhost:8888/login")}
          >
            Sign into Spotify
          </button>
        )}
      </div>
    );
  }
}

export default App;
