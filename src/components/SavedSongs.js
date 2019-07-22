import React from "react";
import { Button, Accordion, Card } from "react-bootstrap";
import { MyContext } from "./MyProvider.js";

function SavedSongs() {
  //const [hFourText, setText] = useState("Top 50 Saved Songs");
  //onClick={() => setText(hFourText + " 1")}
  return (
    <div className="song-flex-container">
      <MyContext.Consumer>
        {(
          context //destructure the context object later.
        ) =>
          context.userSavedSongs ? (
            <React.Fragment>
              <Accordion className="song-flex-container">
                <Card>
                  <h4 className="SongsHeading">"Top 50 Saved Songs"</h4>
                  {context.userSavedSongs}
                </Card>
                <Button variant="success">Submit</Button>
              </Accordion>
            </React.Fragment>
          ) : (
            <div>
              <p>"OOOps"</p>
            </div>
          )
        }
      </MyContext.Consumer>
    </div>
  );
}

export default SavedSongs;
