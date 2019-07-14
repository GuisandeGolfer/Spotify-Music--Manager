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

  // componentDidMount() {
  //   this.setState({ playlists: this.props.playlists, songs: this.props.songs });
  // }

  render() {
    const { playlists, songs } = this.state;
    return (
      <div>
        <SavedSongs songs={songs} />
        <Playlist playlists={playlists} />
      </div>
    );
  }
}

export default SpotifyData;
