import React, { Component } from "react";
import queryString from "query-string";

export const MyContext = React.createContext();

export default class MyProvider extends Component {
  constructor() {
    super();
    this.state = {
      user: "",
      accountType: "",
      playlists: [],
      userSavedSongs: []
    };
  }

  componentDidMount() {
    let parsed = queryString.parse(window.location.search);
    let accessToken = parsed.access_token;

    if (accessToken) {
      async function getSpotData() {
        const spot_object = {}; //object to store fetched data.
        //==============profile data fetch===============
        const profileData = await fetch("https://api.spotify.com/v1/me", {
          headers: {
            Authorization: "Bearer " + accessToken
          }
        });
        const profileJSON = await profileData.json();
        spot_object.user = profileJSON.display_name;
        spot_object.accountType = profileJSON.product;

        //==========Playlist Fetch==============

        const playlistData = await fetch(
          "https://api.spotify.com/v1/me/playlists",
          {
            headers: { Authorization: "Bearer " + accessToken }
          }
        );
        const playlistJSON = await playlistData.json();
        spot_object.playlists = playlistJSON.items.map(item => {
          return {
            name: item.name,
            key: item.id,
            songCount: item.tracks.total,
            imageUrl: item.images[0].url
          };
        });
        const songData = await fetch("https://api.spotify.com/v1/me/tracks", {
          headers: { Authorization: "Bearer " + accessToken }
        });
        const songJSON = await songData.json();

        spot_object.userSavedSongs = songJSON.items.map(item => {
          return {
            name: item.track.name
          };
        });

        //these work fine here.
        const songComponents = spot_object.userSavedSongs.map(song => [
          <p>{song.name}</p>,
          <input type="radio" />
        ]);
        const playlistComponents = spot_object.playlists.map(song => {
          return [
            <div style={{ border: "3px solid lightgreen", paddingTop: "4px" }}>
              ,<label style={{ padding: "5px" }}>{song.name}</label>,
              <img
                height="300"
                width="300"
                alt="album cover"
                src={song.imageUrl}
              />
              ,
              <p style={{ padding: "5px" }}>
                Number of Songs: {song.songCount}
              </p>
              ,
            </div>
          ];
        });

        return {
          spot_object,
          playlistComponents,
          songComponents
        };
      }

      const setStateAsync = async () => {
        let newStateObject = await getSpotData();
        this.setState({
          user: newStateObject.spot_object.user,
          accountType: newStateObject.spot_object.accountType,
          playlists: newStateObject.playlistComponents,
          userSavedSongs: newStateObject.songComponents
        });
      };
      setStateAsync();
    }
  }

  render() {
    return (
      <MyContext.Provider
        value={
          {
            user: this.state.user,
            accountType: this.state.accountType,
            userSavedSongs: this.state.userSavedSongs,
            playlists: this.state.playlists
          }
          // state: this.state,
          // playlists: [<h1>Playlist Name</h1>, <h3>Song Count</h3>],
          // songs: [<label>Whats up bro</label>, <input type="checkbox" />]
        }
      >
        {this.props.children}
      </MyContext.Provider>
    );
  }
}
