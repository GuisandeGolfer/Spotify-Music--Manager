import React, { Component } from "react";
import SavedSongs from "./SavedSongs.js";
import Playlist from "./Playlist.js";

let songData = [
  //dummy data in place of Spotify User Data.
  { name: "Killer Queen", id: 1 },
  { name: "Another One Bites the Dust", id: 2 },
  { name: "Dont Stop me Now", id: 3 }
];

let playData = [
  { name: "Oui Oui", id: 1, totalTime: 168 },
  { name: ":))))", id: 2, totalTime: 240 },
  { name: "Cypher", id: 3, totalTime: 89 },
  { name: "Death to Facists", id: 4, totalTime: 65 }
];

class SpotifyData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      serverData: props.serverData
    };
  }

  render() {
    // const QueenSongs = songData.map(song => {
    //   return [<input type="checkbox" />, <p key={song.id}>{song.name}</p>]; //you can return multiple JSX elements in an array and React un-wraps it
    // });
    // const playlists = playData.map(list => {
    //   return [
    //     <label key={list.id}>{list.name}</label>,
    //     <p>{list.totalTime}</p>
    //   ];
    // });
    return (
      <div>
        <SavedSongs songs={songData} />
        <Playlist playlists={playData} />
      </div>
    );
  }
}

export default SpotifyData;
