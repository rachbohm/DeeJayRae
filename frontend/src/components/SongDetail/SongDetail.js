import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { getSingleSongThunk, deleteSongThunk } from '../../store/songs';
import './SongDetail.css';
import EditSongForm from '../EditSongForm/EditSongForm';

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
    dispatch(deleteSongThunk(song.id))
  };

  if (!song) return null;

  return (

    <div>SongDetail

      {song && (
        <>
          <img src={song.previewImage} />
          <div>Title: {song.title}</div>
          <div>Song ID: {song.id}</div>
          <div>Artist ID: {song.userId}</div>
          <div>Album ID: {song.albumId}</div>
          <div>Description: {song.description}</div>
          <div>Url: {song.url}</div>
          {isOwner && <button onClick={deleteHandler}>Delete</button>}
          {isOwner &&
            <EditSongForm song={song} />
          }
        </>
      )}
    </div>

  )
}

export default SongDetail;
