import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { loadAllPlaylistsThunk } from '../../store/playlists';
import PlaylistCard from './PlaylistCard';
import './PlaylistList.css';

const PlaylistList = () => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const history = useHistory();

  const sessionUser = useSelector(state => state.session.user);

  const handleCreatePlaylist = () => {
    history.push('/playlists/new')
  };

  useEffect(() => {
    dispatch(loadAllPlaylistsThunk()).then(() => setIsLoaded(true))
  }, [dispatch]);

  let playlists = useSelector(state => state.playlistsState);
  let playlistsArr = Object.values(playlists).sort((a, b) => b.id - a.id);

    return (
      <div className="playlistList-container">
        <h2 className="playlist-list-intro">Check out our free playlists below!</h2>
        {sessionUser.id ? (
          <>
            <h3>Or click the button to create your own playlist:</h3>
            <button className="create-playlist-button" onClick={handleCreatePlaylist}>Create Playlist</button>
          </>
        ) : (<>
            <h3>
              <a href='/login'>Log in</a> to create your own playlist!
            </h3>
        </>)}
        <div className="playlistList">
          {playlistsArr.map((playlist) => (
            //passing in each playlist as a prop to be used in PlaylistCard
            <PlaylistCard key={playlist.id} playlist={playlist} />
          ))}
        </div>
      </div>
    )
}

export default PlaylistList;
