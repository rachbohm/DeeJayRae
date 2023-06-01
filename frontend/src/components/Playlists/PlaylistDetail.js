import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { loadPlaylistThunk, deletePlaylistThunk } from '../../store/playlists';
import SongCard from '../SongCard/SongCard';
import './PlaylistDetail.css';

const PlaylistDetail = () => {
  const { playlistId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(loadPlaylistThunk(playlistId)).then((loadedPlaylist) => {
      setIsLoaded(true);
    });

  }, [dispatch, playlistId]);

  const playlist = useSelector(state => state.playlistsState[playlistId]);

  const sessionUser = useSelector(state => state.session.user);

  let isOwner;
  if (playlist) {
    isOwner = sessionUser.id === playlist.userId;
  }

  const deleteHandler = () => {
    if (window.confirm("Are you sure you want to delete this playlist?")) {
     dispatch(deletePlaylistThunk(playlist.id)).then(() => {
        window.alert("Playlist successfully deleted.")
        history.push('/playlists')
      })
    }
    return;
  };

  if (!playlist) return null;

  return isLoaded && (
    <div className="playlist-detail-container-1">

      <h1 className="playlist-detail-title">{playlist.name}</h1>
      <div className="playlist-detail-container">
        {playlist && (
          <>
            <div className="playlist-detail">
              <img src={playlist.previewImage} alt="Playlist Preview" />
              <table>
                <tbody>
                  <tr>
                    <td>Title:</td>
                    <td>{playlist.name}</td>
                  </tr>
                  <tr>
                    <td>Creator:</td>
                    <td>{playlist.User.username}</td>
                  </tr>
                  <tr>
                    <td>Length:</td>
                    <td>{playlist.Songs.length} songs</td>
                  </tr>
                </tbody>
              </table>
                {isOwner && (
                  <div className="playlist-detail-buttons">
                    <button className="playlist-detail-button" onClick={() => history.push(`/playlists/${playlist.id}/edit`)}>
                      Edit Playlist
                    </button>
                    <button className="playlist-detail-button" onClick={deleteHandler}>
                      Delete Playlist
                    </button>
                  </div>
                )}
            </div>
            <div className="playlist-songs-container">
              <h2 className="playlist-songs-title">Songs in this playlist:</h2>
              <div className="playlist-songs">
                {playlist.Songs.map((song) => (
                  <SongCard key={song.id} song={song} />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default PlaylistDetail;
