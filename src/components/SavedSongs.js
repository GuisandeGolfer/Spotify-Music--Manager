import React, { Component } from "react";

class SavedSongs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      songComponents: props.songs
    };
  }

  render() {
    const { songComponents } = this.state;

    const songsToRender = songComponents.map(song => {
      return [<h4>{song.name}</h4>, <input type="radio" />];
    });
    return (
      <div className="savedSongs">
        <h4>Top 50 Saved Songs</h4>
        {songsToRender}
        <button>Submit</button>
      </div>
    );
  }
}

export default SavedSongs;
