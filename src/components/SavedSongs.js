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
    return (
      <div className="savedSongs">
        <h4>Top 50 Saved Songs</h4>
        {songComponents}
        <button>Submit</button>
      </div>
    );
  }
}

export default SavedSongs;
