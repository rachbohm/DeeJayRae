import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { getSingleSongThunk, deleteSongThunk } from '../../store/songs';
import './SongDetail.css';
import EditSongForm from '../EditSongForm/EditSongForm';
import CommentList from '../CommentList/CommentList';

const SongDetail = () => {
  const { songId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getSingleSongThunk(songId))
  }, [dispatch, songId]);

  const song = useSelector(state => state.songsState[songId]);

  const sessionUser = useSelector(state => state.session.user);

  let isOwner;
  if (song) {
    isOwner = sessionUser.id === song.userId;
  }

  const deleteHandler = () => {
    if (window.confirm("Are you sure you want to delete this song?")) {
      dispatch(deleteSongThunk(song.id)).then(() => {
        window.alert("Song successfully deleted.")
        history.push('/')
      })
    }
    return;
  };

  if (!song) return null;

  return (
    <div className="song-detail-container">
      {song && (
        <>
          <div className="song-detail">
            <img src={song.previewImage} alt="Song Preview" />
            <table>
              <tbody>
                <tr>
                  <td>Title:</td>
                  <td>{song.title}</td>
                </tr>
                <tr>
                  <td>Song ID:</td>
                  <td>{song.id}</td>
                </tr>
                <tr>
                  <td>Artist:</td>
                  <td>
                    {song.Artist.firstName} {song.Artist.lastName}
                  </td>
                </tr>
                <tr>
                  <td>Album ID:</td>
                  <td>{song.albumId}</td>
                </tr>
                <tr>
                  <td>Description:</td>
                  <td>{song.description}</td>
                </tr>
                <tr>
                  <td>Url:</td>
                  <td>{song.url}</td>
                </tr>
              </tbody>
            </table>
            {isOwner && (
              <button className="delete-button" onClick={deleteHandler}>
                Delete
              </button>
            )}
          </div>
          <div className="edit-song-form-container">
            {isOwner && <EditSongForm song={song} />}
          </div>
          <div>
            <CommentList song={song} />
          </div>
        </>
      )}
    </div>
  );

}

export default SongDetail;
