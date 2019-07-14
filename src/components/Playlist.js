import React from "react";

function Playlist(props) {
  const styles = {
    padding: "5px"
  };

  const playData = Array.from(props.playlists);
  const songsToRender = playData.map(song => {
    return [
      <div style={{ border: "3px solid lightgreen", paddingTop: "4px" }}>
        ,<label style={styles}>{song.name}</label>,
        <img height="300" width="300" alt="album cover" src={song.imageUrl} />,
        <p style={styles}>Number of Songs: {song.songCount}</p>,
      </div>
    ];
  });
  return (
    <div className="playlists">
      <p>Amount of Playlists</p>
      <h4>Top User Playlists</h4>
      {songsToRender}
    </div>
  );
}

export default Playlist;
