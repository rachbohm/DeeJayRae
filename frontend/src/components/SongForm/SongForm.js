import { createSongThunk } from "../../store/songs";
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

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
    <div>
      {errors.length > 0 && errors.map((error, i) => {
       return <div key={i}>{error}</div>
      })}
      <form className="add-song-form" onSubmit={handleSubmit}>
        <label>Create New Song</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Song Title"
        />
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Song URL"
        />
        <input
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="Image URL"
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />
        <input
          type="number"
          value={albumId}
          onChange={(e) => setAlbumId(e.target.value)}
          placeholder="Album ID"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  ) : null;
}
