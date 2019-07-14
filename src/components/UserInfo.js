import React from "react";

function UserInfo(props) {
  return (
    <div>
      <h2>
        Welcome {props.username} on a {props.accountType} account.
      </h2>
      <p className="description">
        Spot-Music-Manager will help you organize your saved songs into
        playlists of your choosing.
      </p>
    </div>
  );
}

export default UserInfo;
