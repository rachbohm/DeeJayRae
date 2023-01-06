import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllSongsThunk, getSongsHelper } from '../../store/songs';
import SongCard from './SongCard';

export default function SongsBrowser() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllSongsThunk())
  }, [dispatch])

  let songs = useSelector(getSongsHelper);
  console.log(songs)

  return (
    <>
      <div>SongsBrowser</div>
      <div className="landingPage">
        {songs.map((song) => (
          <SongCard key={song.id} song={song} />
        ))}
      </div>
    </>
  )
}
