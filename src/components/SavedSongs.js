import React, { useState } from "react";
import { MyContext } from "./MyProvider.js";

function SavedSongs() {
  const [songs, setSongs] = useState("Songs");
  return (
    <div className="savedSongs">
      <h4>Top 50 Saved Songs</h4>
      <MyContext.Consumer>
        {(
          context //destructure the context object later.
        ) =>
          context.userSavedSongs ? (
            <div>
              {context.userSavedSongs}
              {songs}
            </div>
          ) : (
            <div>
              <p>"OOOps</p>
            </div>
          )
        }
      </MyContext.Consumer>
      <button onClick={() => setSongs(songs + " ANother OnE")}>Submit</button>
    </div>
  );
}

export default SavedSongs;
