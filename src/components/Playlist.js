import React from "react";
import { MyContext } from "./MyProvider.js";

function Playlist() {
  return (
    <MyContext.Consumer>
      {context =>
        context.playlists ? (
          <div className="playlists-flex-container">
            <h4>Top User Playlists</h4>
            {context.playlists}
          </div>
        ) : (
          <h4>Loading...</h4>
        )
      }
    </MyContext.Consumer>
  );
}
export default Playlist;
