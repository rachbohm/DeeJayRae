import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { loadAllPlaylistsThunk, loadPlaylistThunk } from '../../store/playlists';
import './PlaylistList.css';

const PlaylistList = () => {
  const dispatch = useDispatch();
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const history = useHistory();

  const sessionUser = useSelector(state => state.session.user);
  const playlists = useSelector(state => state.playlistsState);
  const playlistsArr = Object.values(playlists).sort((a, b) => b.id - a.id);

  const handleCreatePlaylist = () => {
    history.push('/playlists/new');
  };

  const handlePlaylistClick = async (playlist) => {
    await dispatch(loadPlaylistThunk(playlist.id)).then((updatedPlaylist) => {
      //set selectedPlaylist to the playlist that was returned from the thunk
      setSelectedPlaylist(updatedPlaylist);
      setIsLoaded(true);
    })
  };

  useEffect(() => {
    dispatch(loadAllPlaylistsThunk());
  }, [dispatch]);

  return (
    <div className="playlist-list-container">
      <h2 className="playlist-list-intro">Check out our free playlists below!</h2>
      {sessionUser.id ? (
        <>
          <h3>Or click the button to create your own playlist:</h3>
          <button className="create-playlist-button" onClick={handleCreatePlaylist}>
            Create Playlist
          </button>
        </>
      ) : (
        <h3>
          <a href="/login">Log in</a> to create your own playlist!
        </h3>
      )}
      <div className="playlist-list">
        <div className="playlist-cards">
          {playlistsArr.map((playlist) => (
            <div
              className={`playlist-card-container ${selectedPlaylist?.id === playlist.id ? 'selected' : ''}`}
              key={playlist.id}
              onClick={() => handlePlaylistClick(playlist)}
            >
              <div className="playlist-card-li">
                <a href="#">
                  <img src={playlist.previewImage} alt="Playlist Preview" />
                  {playlist.name}
                </a>
                <div className="playlist-creator">Creator: {playlist.User.username}</div>
              </div>
            </div>
          ))}
        </div>
        {selectedPlaylist && isLoaded && (
          <div className="playlist-detail-container">
            <div className="playlist-detail">
              <h2>{selectedPlaylist.name}</h2>
              <img src={selectedPlaylist.previewImage} alt="Playlist Preview" />
              <table>
                <tbody>
                  <tr>
                    <td>Length:</td>
                    <td>{selectedPlaylist.Songs ? selectedPlaylist.Songs.length : 0} songs</td>
                  </tr>
                  <tr>
                    <td>Creator:</td>
                    <td>{selectedPlaylist.User.username}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlaylistList;
