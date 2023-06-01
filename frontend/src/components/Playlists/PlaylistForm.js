import { createPlaylistThunk } from "../../store/playlists";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import './PlaylistForm.css';

export default function PlaylistForm() {
  const sessionUser = useSelector(state => state.session.user);
  const history = useHistory();
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  const [name, setName] = useState('');
  const [previewImage, setPreviewImage] = useState('https://media.istockphoto.com/id/1034671212/vector/cassette-with-retro-label-as-vintage-object-for-80s-revival-mix-tape-design.jpg?s=612x612&w=0&k=20&c=ILi5E7_zIBJk1ksjmMGA2mHJ31QZ1__C9nD4NeduxGo=');

  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors([]);

    const payload = {
      name,
      previewImage,
    };

    await dispatch(createPlaylistThunk(payload))
      .then(() => {
        setName('');
        setPreviewImage('');
        window.alert('Playlist successfully created');
        history.push('/playlists');
      }
    ).catch(async res => {
      const data = await res.json();
      if (data.errors) setErrors(data.errors);
    }
    );
  };

  return sessionUser.id ? (
    <div className="add-playlist-container">
      {errors.length > 0 && errors.map((error, i) => (
        <div key={i} className="error-message">{error}</div>
      ))}
      <form className="add-playlist-form" onSubmit={handleSubmit}>
        <h1 className="add-playlist-title">Create a Playlist</h1>
        <label className="add-playlist-label">Name</label>
        <input
          className="add-playlist-input"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label className="add-playlist-label">Preview Image URL</label>
        <input
          className="add-playlist-input"
          type="text"
          value={previewImage}
          onChange={(e) => setPreviewImage(e.target.value)}
          required
        />
        <button className="add-playlist-button" type="submit">Create Playlist</button>
      </form>
    </div>
  ) : null;
}
