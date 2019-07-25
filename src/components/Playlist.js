import React, { useContext, useState } from "react";
import { MyContext } from "./MyProvider.js";
import { ListGroup, Button } from "react-bootstrap";

function StagedPlaylists() {
  //always have React components capitalized.
  const [songs, addSongs] = useState(5);

  /*
    instead of adding to the state, this handle will post 
    the songs in the function's state to the corresponding playlist it will fetch 
    from the playlist component. 
  */
  /**
   * Another handleClick needs to be made for the delete buttons that will
   * render next to a song whenever it has been added in the queue.
   */
  const handleClick = () => addSongs(prevState => prevState + 1);
  return (
    <ListGroup>
      <ListGroup.Item>
        Amount of Staged Songs: {songs}
        <Button
          style={{ float: "right" }}
          variant="primary"
          onClick={handleClick}
        >
          Click Me
        </Button>
      </ListGroup.Item>
    </ListGroup>
  );
}

function Playlist() {
  const fetchedPlaylists = useContext(MyContext);
  return (
    <React.Fragment>
      {fetchedPlaylists.playlists ? (
        <div className="playlists-flex-container">
          <StagedPlaylists style={{ float: "right" }} />
          <h4>Top User Playlists</h4>
          {fetchedPlaylists.playlists}
        </div>
      ) : (
        <h4>Loading...</h4>
      )}
    </React.Fragment>
  );
}
export default Playlist;
