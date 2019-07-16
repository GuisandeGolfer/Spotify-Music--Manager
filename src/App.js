import React, { Component } from "react";
import SpotifyData from "./components/SpotifyData.js";
import UserInfo from "./components/UserInfo.js";
import queryString from "query-string";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this._isMounted = false;
    this.state = {
      isLoading: true,
      user: "",
      accountType: "",
      playlists: "",
      userSavedSongs: ""
    };
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  componentDidMount() {
    let parsed = queryString.parse(window.location.search);
    let accessToken = parsed.access_token;

    if (accessToken) {
      this._isMounted = true;

      setTimeout(() => {
        //use fetch() with the access_token
        fetch("https://api.spotify.com/v1/me", {
          headers: {
            Authorization: "Bearer " + accessToken
          }
        })
          .then(response => response.json())
          .then(data => {
            if (this._isMounted) {
              this.setState({
                user: data.display_name,
                accountType: data.product
              });
            }
          });
        fetch("https://api.spotify.com/v1/me/playlists", {
          headers: { Authorization: "Bearer " + accessToken }
        })
          .then(response => response.json())
          .then(data => {
            this.setState({
              playlists: data.items.map(item => {
                const {
                  name,
                  tracks: { total }
                } = item;
                return {
                  name: name,
                  songCount: total,
                  imageUrl: item.images[0].url
                };
              })
            });
          });
        fetch("https://api.spotify.com/v1/me/tracks", {
          headers: {
            Authorization: "Bearer " + accessToken
          }
        })
          .then(response => response.json())
          .then(data => {
            this.setState({
              userSavedSongs: data.items.map(item => {
                return {
                  name: item.track.name
                };
              })
            });
          });
      }, 1200);
    }
  }

  render() {
    return (
      <div className="App">
        {this.state.user ? (
          <div>
            <UserInfo
              username={this.state.user}
              accountType={this.state.accountType}
            />

            <SpotifyData
              playlists={this.state.playlists}
              songs={this.state.userSavedSongs}
            />
          </div>
        ) : (
          <button
            style={{
              padding: "20px",
              fontSize: "50px",
              marginTop: "20px"
            }}
            onClick={() => {
              window.location = window.location.href.includes("localhost")
                ? "http://localhost:8888/login"
                : "https://spot-music-manager-backend.herokuapp.com/login";
            }}
          >
            Sign into Spotify
          </button>
        )}
      </div>
    );
  }
}

export default App;
