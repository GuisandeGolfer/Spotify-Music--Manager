import React, { useContext, useState } from "react";
import { Button, Accordion, ListGroup } from "react-bootstrap";
import { MyContext } from "./MyProvider.js";

function StagedSongs() {
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
function SavedSongs() {
  //const [hFourText, setText] = useState("Top 50 Saved Songs");
  //onClick={() => setText(hFourText + " 1")}
  const savedSongs = useContext(MyContext);
  return (
    <div className="song-flex-container">
      {savedSongs.userSavedSongs ? (
        <React.Fragment>
          <StagedSongs />
          <Accordion className="song-flex-container">
            {/* <Card> */}
            <h4 className="SongsHeading">"Top 50 Saved Songs"</h4>
            {savedSongs.userSavedSongs}
            {/* </Card> */}
            <Button variant="success">Submit</Button>
          </Accordion>
        </React.Fragment>
      ) : (
        <div>
          <p>"OOOps"</p>
        </div>
      )}
    </div>
  );
}

export default SavedSongs;
