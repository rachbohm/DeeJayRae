import { createSongThunk } from "../../store/songs";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { loadAllAlbumsThunk } from "../../store/albums";
import './SongForm.css';

export default function SongForm() {
  const sessionUser = useSelector(state => state.session.user);
  const history = useHistory();
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(loadAllAlbumsThunk()).then(() => setIsLoaded(true))
  }, [dispatch]);

  const albums = useSelector(state => state.albumsState);
  const albumsArr = Object.values(albums).sort((a, b) => b.id - a.id);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('https://png.pngtree.com/png-clipart/20221006/original/pngtree-music-notes-png-image_8660757.png');
  const [albumId, setAlbumId] = useState('');

  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors([]);

    const payload = {
      title,
      description,
      url,
      imageUrl,
      albumId,
    };

    await dispatch(createSongThunk(payload))
      .then(() => {
        setTitle('');
        setDescription('');
        setUrl('');
        setImageUrl('');
        setAlbumId('');
        window.alert('Song successfully created');
        history.push('/');
      }).catch(async res => {
        const data = await res.json();
        if (data.errors) setErrors(data.errors);
      });
  };

  return sessionUser.id && isLoaded ? (
    <div className="add-song-container">
      {errors.length > 0 && errors.map((error, i) => (
        <div key={i} className="error-message">{error}</div>
      ))}
      <form className="add-song-form" onSubmit={handleSubmit}>
        <label className="add-song-label">Create New Song</label>
        <div className="input-container">
          <label htmlFor="title" className="input-label">
            Song Title
          </label>
          <input
            type="text"
            id="title"
            className="add-song-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter a song title"
            required={true}
          />
        </div>
        <div className="input-container">
          <label htmlFor="url" className="input-label">
            Song URL
          </label>
          <input
            type="text"
            id="url"
            className="add-song-input"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter a song URL"
            required={true}
          />
        </div>
        <div className="input-container">
          <label htmlFor="imageUrl" className="input-label">
            Image URL (optional)
          </label>
          <input
            type="text"
            id="imageUrl"
            className="add-song-input"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Enter an image URL"
          />
        </div>
        <div className="input-container">
          <label htmlFor="description" className="input-label">
            Description
          </label>
          <input
            type="text"
            id="description"
            className="add-song-input"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter a description"
            required={true}
          />
        </div>
        <div className="input-container">
          <label htmlFor="album" className="input-label">
            Album
          </label>
          <select
            id="album"
            className="add-song-input"
            value={albumId}
            onChange={(e) => setAlbumId(e.target.value)}
            required={true}
          >
            <option value="">Select an album</option>
            {albumsArr.map((album) => (
              <option key={album.id} value={album.id}>
                {album.title}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="add-song-button">
          Submit
        </button>
      </form>
    </div>
  ) : null;
}
