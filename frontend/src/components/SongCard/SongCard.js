import './SongCard.css';

const SongCard = ({ song }) => {

  return (
    <div className="songCard">

        <img src={song.previewImage} />
        <div>{song.title}</div>
        <div>Artist: {song.userId}</div>

    </div>
  )
}

export default SongCard
