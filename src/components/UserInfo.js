import React from "react";
import { MyContext } from "./MyProvider.js";

function UserInfo() {
  return (
    <MyContext.Consumer>
      {context => {
        const { user, accountType } = context;
        return (
          <div>
            <h2>
              Welcome {user} on a {accountType} account.
            </h2>
            <p className="description">
              Spot-Music-Manager will help you organize your saved songs into
              playlists of your choosing.
            </p>
          </div>
        );
      }}
    </MyContext.Consumer>
  );
}
export default UserInfo;
