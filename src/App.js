import React from "react";
import UserInfo from "./components/UserInfo.js";
import MyProvider from "./components/MyProvider.js";
import SavedSongs from "./components/SavedSongs.js";
import Playlist from "./components/Playlist.js";
import queryString from "query-string";
import "./App.css";

function App() {
  let preParseToken = window.location.search;
  let access_token = queryString.parse(preParseToken).access_token;
  return (
    <div>
      {access_token ? (
        <MyProvider>
          <UserInfo />
          <div className="App-flex-container">
            <SavedSongs />
            <Playlist />
          </div>
        </MyProvider>
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
export default App;
