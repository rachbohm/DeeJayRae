import { createSongThunk } from "../../store/songs";
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

export default function SongForm() {

  const sessionUser = useSelector(state => state.session.user);

  const dispatch = useDispatch();
  const history = useHistory();

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [url, setUrl] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [albumId, setAlbumId] = useState('')
  const [hasSubmitted, setHasSubmitted] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      title,
      description,
      url,
      imageUrl,
      albumId
    };

    // let newSong = await
    dispatch(createSongThunk(payload));
    // if (newSong) {
    //   history.push(`/songs/${newSong.id}`);
    // }
  };

  return sessionUser.id ? (
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
  ) : null;
}
