import React, { Component } from "react";
import queryString from "query-string";
import { Card, Accordion, Button } from "react-bootstrap";

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
        //console.log(songJSON); // this still works tho. here for object structure digging.
        spot_object.userSavedSongs = songJSON.items.map(item => {
          return {
            name: item.track.name,
            id: item.track.id
            //artist: item.track.artists[0].name
          };
        });
        //{song.artist}
        //now it is breaking here because of react-bootstrap components
        const songComponents = spot_object.userSavedSongs.map(song => {
          return [
            <Card key={song.id}>
              <Card.Header>{song.name}</Card.Header>
              <Accordion.Toggle
                style={{ float: "left" }}
                as={Button}
                variant="link"
                eventKey={song.id}
              >
                Song Info
              </Accordion.Toggle>
              <Accordion.Collapse eventKey={song.id}>
                <Card.Body>By: Artist</Card.Body>
              </Accordion.Collapse>
            </Card>
          ];
        });
        const playlistComponents = spot_object.playlists.map(song => {
          return [
            <Accordion style={{ padding: "10px" }} key={song.key}>
              <Card style={{ width: "18rem", padding: "10px" }}>
                <Card.Title
                  style={{
                    padding: "10px",
                    textAlign: "center",
                    border: "5px solid lightgreen"
                  }}
                >
                  {song.name}
                </Card.Title>
                <Card.Img
                  variant="top"
                  alt="album cover"
                  src={song.imageUrl}
                  height="286"
                  width="180"
                />
                <Accordion.Toggle as={Button} variant="link" eventKey="1">
                  More Info
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="1">
                  <Card.Body
                    style={{ padding: "5px", display: "inline-block" }}
                  >
                    Number of Songs: {song.songCount}
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
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
