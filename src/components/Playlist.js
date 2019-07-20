import React from "react";
import { MyContext } from "./MyProvider.js";

function Playlist() {
  return (
    <div className="playlists">
      <h4>Top User Playlists</h4>
      <MyContext.Consumer>
        {context =>
          context.playlists ? (
            <div>{context.playlists}</div>
          ) : (
            <h4>Loading...</h4>
          )
        }
      </MyContext.Consumer>
    </div>
  );
}
export default Playlist;
