import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadAllSongsThunk } from '../../store/songs';
import SongCard from '../SongCard/SongCard';
import './SongList.css';

const SongList = () => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(loadAllSongsThunk()).then(() => setIsLoaded(true))
  }, [dispatch]);

  let songs = useSelector(state => state.songsState);
  let songsArr = Object.values(songs);

  return (
    <div className="landingPage">
      <div className="song-list-intro">Check out our free songs below</div>
      <div className="songList">
        {songsArr.map((song) => (
          //passing in each song as a prop to be used in SongCard
          <SongCard key={song.id} song={song} />
        ))}
      </div>
    </div>
  )
}

export default SongList;
