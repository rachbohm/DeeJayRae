import './SongCard.css';
import { NavLink } from 'react-router-dom';


const SongCard = ({ song }) => {
  return (
    <div className="songCard">

      <NavLink className='song-title' to={`/songs/${song.id}`}>
        <img src={song.previewImage} />
        {song.title}
        <div className="song-artist">
          Artist: {song.Artist.firstName} {song.Artist.lastName}
        </div>
      </NavLink>
    </div>
  )
}

export default SongCard
