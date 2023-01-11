import './EditSongForm.css';
import { editSongThunk } from "../../store/songs";
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const EditSongForm = ({song}) => {

  const sessionUser = useSelector(state => state.session.user);
  const { songId } = useParams();
  const dispatch = useDispatch();

    const [title, setTitle] = useState(song.title)
    const [description, setDescription] = useState(song.description)
    const [url, setUrl] = useState(song.url)
    const [imageUrl, setImageUrl] = useState(song.previewImage)

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      title,
      description,
      url,
      imageUrl
    };

    dispatch(editSongThunk(payload, songId))
  }


  return sessionUser.id ? (
    <form className="edit-song-form" onSubmit={handleSubmit}>
      <label>Edit Song</label>
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
      <button type="submit">Submit</button>
    </form>
  ) : null;
}

export default EditSongForm;
