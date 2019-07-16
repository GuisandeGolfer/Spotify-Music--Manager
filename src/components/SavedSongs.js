import React, { Component } from "react";

class SavedSongs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      songComponents: props.songs
    };
  }

  render() {
    let arrayOfSongs = Array.from(this.state.songComponents); //find out how to take this out in SavedSongs.JS and Playlist.JS
    let songsToRender = arrayOfSongs.map(song => {
      return [<h4>{song.name}</h4>, <input type="radio" />];
    });
    return (
      <div className="savedSongs">
        <h4>Top 50 Saved Songs</h4>
        {this.state.songComponents ? (
          <div>{songsToRender}</div>
        ) : (
          <h4>Loading...</h4>
        )}

        <button>Submit</button>
      </div>
    );
  }
}

export default SavedSongs;
