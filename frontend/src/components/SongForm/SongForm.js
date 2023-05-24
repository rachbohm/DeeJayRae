import { createSongThunk } from "../../store/songs";
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './SongForm.css';

export default function SongForm() {

  const sessionUser = useSelector(state => state.session.user);

  const dispatch = useDispatch();

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [url, setUrl] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [albumId, setAlbumId] = useState('')

  const [errors, setErrors] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors([]);

    const payload = {
      title,
      description,
      url,
      imageUrl,
      albumId
    };

    await dispatch(createSongThunk(payload))
      .then(() => {
        setTitle('');
        setDescription('');
        setUrl('');
        setImageUrl('');
        setAlbumId('');
      }).catch(async res => {
        const data = await res.json();
        if (data.errors) setErrors(data.errors);
      })
  }

  return sessionUser.id ? (
    <div className="add-song-container">
      {errors.length > 0 && errors.map((error, i) => (
        <div key={i} className="error-message">{error}</div>
      ))}
      <form className="add-song-form" onSubmit={handleSubmit}>
        <label className="add-song-label">Create New Song</label>
        <input
          type="text"
          className="add-song-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Song Title"
        />
        <input
          type="text"
          className="add-song-input"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Song URL"
        />
        <input
          type="text"
          className="add-song-input"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="Image URL"
        />
        <input
          type="text"
          className="add-song-input"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />
        <input
          type="number"
          className="add-song-input"
          value={albumId}
          onChange={(e) => setAlbumId(e.target.value)}
          placeholder="Album ID"
        />
        <button type="submit" className="add-song-button">Submit</button>
      </form>
    </div>
  ) : null;

}
