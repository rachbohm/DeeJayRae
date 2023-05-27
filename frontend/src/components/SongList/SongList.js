import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadAllSongsThunk } from '../../store/songs';
import SongCard from '../SongCard/SongCard';
import './SongList.css';
import { useHistory } from 'react-router-dom';

const SongList = () => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const history = useHistory();

  const sessionUser = useSelector(state => state.session.user);

  const handleCreateSong = () => {
    history.push('/songs/new');
  };

  useEffect(() => {
    dispatch(loadAllSongsThunk()).then(() => setIsLoaded(true))
  }, [dispatch]);

  let songs = useSelector(state => state.songsState);
  let songsArr = Object.values(songs).sort((a, b) => b.id - a.id);

  return (
    <div className="landingPage">
      <h2 className="song-list-intro">Check out our free songs below!</h2>
      {sessionUser.id ? (
        <>
          <h3>Or click the button to create your own song:</h3>
          <button className="create-song-button" onClick={handleCreateSong}>Create Song</button>
        </>
      ) : (<>
        <h3>
          <a href='/login'>Log in</a> to create your own song!
        </h3>
      </>)}
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
