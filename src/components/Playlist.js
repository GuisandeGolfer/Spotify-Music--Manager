import React from "react";

function Playlist(props) {
  const { playlists } = props;
  return (
    <div className="playlists">
      <h4>Top User Playlists</h4>
      {playlists}
    </div>
  );
}

export default Playlist;
