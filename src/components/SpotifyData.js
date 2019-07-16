import React, { Component } from "react";
import SavedSongs from "./SavedSongs.js";
import Playlist from "./Playlist.js";

class SpotifyData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playlists: props.playlists,
      songs: props.songs //playlist object model inside state
    };
  }

  render() {
    return (
      <div>
        <SavedSongs songs={this.state.songs} />
        <Playlist playlists={this.state.playlists} />
      </div>
    );
  }
}

export default SpotifyData;
