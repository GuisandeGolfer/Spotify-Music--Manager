import React from "react";
import { Jumbotron } from "react-bootstrap";
import { MyContext } from "./MyProvider.js";

function UserInfo() {
  return (
    <MyContext.Consumer>
      {context => {
        const { user, accountType } = context;
        return (
          <Jumbotron className="App-header">
            <h2>
              Welcome {user} on a {accountType} account.
            </h2>
            <p className="description">
              Spot-Music-Manager will help you organize your saved songs into
              playlists of your choosing.
            </p>
          </Jumbotron>
        );
      }}
    </MyContext.Consumer>
  );
}
export default UserInfo;
