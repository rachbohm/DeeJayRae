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
  const [imageUrl, setImageUrl] = useState(song.previewImage);
  const [audioFile, setAudioFile] = useState(song.audioFile);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      title,
      description,
      imageUrl,
    };

    // Include audioFile in payload only if it has changed
    if (audioFile !== song.audioFile) {
      payload.audioFile = audioFile;
    }

    try {
      await dispatch(editSongThunk(payload, songId));
      window.alert('Song successfully edited');
    } catch (error) {
      // Handle error if the dispatch fails
      console.error('Error editing song:', error);
    }
  };


  const updateFile = (e) => {
    const file = e.target.files[0];
    if (file) setAudioFile(file);
    else setAudioFile(song.audioFile);
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
      <label htmlFor="audioFile">Audio File</label>
      <input
        type="file" accept="audio/*" onChange={updateFile}
        id="audioFile"
        placeholder="Audio File"
      />
      <button type="submit">Submit</button>
    </form>
  ) : null;

}

export default EditSongForm;
