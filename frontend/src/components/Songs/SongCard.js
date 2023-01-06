import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getAllSongsThunk, getSongsHelper } from '../../store/songs';
import './SongCard.css';

const SongCard = ({ song }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllSongsThunk())
  }, [dispatch])

  console.log(song)
  return (
    <div className="songCard">
      <NavLink to={`/songs/${song.id}`}>
        <img src={song.previewImage} />
        <div>Song Title: {song.title}</div>
        <div>Artist Id: {song.userId}</div>
      </NavLink>
    </div>
  )
}

export default SongCard
