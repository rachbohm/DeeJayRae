import './EditSongForm.css';
import { editSongThunk } from "../../store/songs";
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const EditSongForm = ({ song }) => {

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

    try {
      await dispatch(editSongThunk(payload, songId));
      window.alert('Song successfully edited');
    } catch (error) {
      // Handle error if the dispatch fails
      console.error('Error editing song:', error);
    }
  };



  return sessionUser.id ? (
    <form className="edit-song-form" onSubmit={handleSubmit}>
      <h1>Edit Song</h1>
      <label htmlFor="title">Song Title</label>
      <input
        type="text"
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Song Title"
      />
      <label htmlFor="url">Song URL</label>
      <input
        type="text"
        id="url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Song URL"
      />
      <label htmlFor="imageUrl">Image URL</label>
      <input
        type="text"
        id="imageUrl"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        placeholder="Image URL"
      />
      <label htmlFor="description">Description</label>
      <input
        type="text"
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      <button type="submit">Submit</button>
    </form>
  ) : null;

}

export default EditSongForm;
