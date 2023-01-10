import './SongCard.css';
import { useSelector, useDispatch } from 'react-redux';
import { deleteSongThunk } from '../../store/songs';
import { NavLink } from 'react-router-dom';

const SongCard = ({ song }) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);

  const isOwner = sessionUser.id === song.userId;

  const deleteHandler = () => {
    dispatch(deleteSongThunk(song.id))
  }

  return (
    <div className="songCard">

      <img src={song.previewImage} />
      <NavLink className='song-title' to={`/songs/${song.id}`}>
        {song.title}
      </NavLink>
      <div>Artist: {song.userId}</div>
      {isOwner && <button onClick={deleteHandler}>Delete</button>}

    </div>
  )
}

export default SongCard
