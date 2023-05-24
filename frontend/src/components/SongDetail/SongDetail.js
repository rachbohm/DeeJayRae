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
    if (window.confirm("Please confirm you want to delete this song.")) {
      dispatch(deleteSongThunk(song.id)).then(() => {
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
            <div>Title: {song.title}</div>
            <div>Song ID: {song.id}</div>
            <div>Artist: {song.Artist.firstName} {song.Artist.lastName}</div>
            <div>Album ID: {song.albumId}</div>
            <div>Description: {song.description}</div>
            <div>Url: {song.url}</div>
            {isOwner && (
              <button className="delete-button" onClick={deleteHandler}>
                Delete
              </button>
            )}
          </div>
          <div className="edit-song-form">
            {isOwner && <EditSongForm song={song} />}
          </div>
          <div className="comment-list">
            <CommentList song={song} />
          </div>
        </>
      )}
    </div>
  );
}

export default SongDetail;
