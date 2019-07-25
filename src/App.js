import React from "react";
import UserInfo from "./components/UserInfo.js";
import MyProvider from "./components/MyProvider.js";
import SavedSongs from "./components/SavedSongs.js";
import Playlist from "./components/Playlist.js";
// import those components that were made
import queryString from "query-string";
import "./App.css";
import { Button } from "react-bootstrap";

function App() {
  let preParseToken = window.location.search;
  let access_token = queryString.parse(preParseToken).access_token;
  return (
    <div>
      {access_token ? (
        <MyProvider>
          <UserInfo />
          {/* Create new component for holding staged songs */}
          {/* Create new component for holding staged playlists */}
          <div className="App-flex-container">
            <SavedSongs />
            <Playlist />
          </div>
        </MyProvider>
      ) : (
        <Button
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
          variant="outline-success"
          size="lg"
        >
          Sign into Spotify
        </Button>
      )}
    </div>
  );
}
export default App;
