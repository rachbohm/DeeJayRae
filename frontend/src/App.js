import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import SongForm from "./components/SongForm/SongForm";
import SongList from "./components/SongList/SongList";
import SongDetail from "./components/SongDetail/SongDetail";
import About from "./components/About/About";
import PlaylistList from "./components/Playlists/PlaylistList";
import PlaylistDetail from "./components/Playlists/PlaylistDetail";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/login">
            <About />
            <LoginFormPage />
          </Route>
          <Route exact path="/signup">
            <About />
            <SignupFormPage />
          </Route>
          <Route exact path="/songs/new">
            <SongForm />
          </Route>
          <Route exact path="/songs/:songId">
            <About />
            <SongDetail />
          </Route>
          <Route exact path="/playlists/:playlistId">
            <About />
            <PlaylistDetail />
          </Route>
          <Route exact path="/playlists">
            <About />
            <PlaylistList />
          </Route>
          <Route exact path="/">
            <SongList />
            <About />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
