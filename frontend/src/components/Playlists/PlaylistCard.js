import './PlaylistCard.css';
import { NavLink } from 'react-router-dom';

const PlaylistCard = ({ playlist }) => {
  return (
    <div className="playlistCard">
      <NavLink className='playlist-title' to={`/playlists/${playlist.id}`}>
        <img src={playlist.previewImage} />
        {playlist.name}
        <div className="playlist-creator">
          Creator: {playlist.User.username}
        </div>
      </NavLink>
    </div>
  )
}

export default PlaylistCard
