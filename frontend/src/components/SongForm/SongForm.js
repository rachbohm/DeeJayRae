import { createSongThunk } from "../../store/songs";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { createAlbumThunk, loadAllAlbumsThunk } from "../../store/albums";
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
  const [imageUrl, setImageUrl] = useState('https://png.pngtree.com/png-clipart/20221006/original/pngtree-music-notes-png-image_8660757.png');
  const [albumId, setAlbumId] = useState('');
  const [audioFile, setAudioFile] = useState(null);
  const [newAlbumTitle, setNewAlbumTitle] = useState('');
  const [newAlbumDescription, setNewAlbumDescription] = useState('');
  const [newAlbumImageUrl, setNewAlbumImageUrl] = useState('');
  const [showNewAlbumForm, setShowNewAlbumForm] = useState(false);


  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors([]);

    const albumPayload = {}
    if (showNewAlbumForm) {
      albumPayload = {
        title: newAlbumTitle,
        description: newAlbumDescription,
        imageUrl: newAlbumImageUrl
      }
    };

    const albumResponse = await dispatch(createAlbumThunk(albumPayload));
    const { albumId: createdAlbumId } = albumResponse.data;

    if (albumResponse.errors) {
      setErrors(albumResponse.errors);
      return;
    }

    setAlbumId(createdAlbumId);

    const payload = {
      title,
      description,
      imageUrl,
      albumId,
      audioFile,
    };

    await dispatch(createSongThunk(payload))
      .then(() => {
        setTitle('');
        setDescription('');
        setImageUrl('');
        setAlbumId('');
        setAudioFile(null);
        window.alert('Song successfully created');
        history.push('/');
      }).catch(async res => {
        const data = await res.json();
        if (data.errors) setErrors(data.errors);
      });
  };

  const updateFile = (e) => {
    const file = e.target.files[0];
    if (file) setAudioFile(file);
  };

  const handleAlbumChange = (e) => {
    const selectedAlbumId = e.target.value;
    setAlbumId(selectedAlbumId);
    setShowNewAlbumForm(selectedAlbumId === 'other')
  }

  return sessionUser.id && isLoaded ? (
    <div className="add-song-container">
      {errors.length > 0 && errors.map((error, i) => (
        <div key={i} className="error-message">{error}</div>
      ))}
      <form className="add-song-form" onSubmit={handleSubmit}>
        <label className="add-playlist-title">Create New Song!</label>
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
            onChange={handleAlbumChange}
            required={true}
          >
            <option value="">Select an album</option>
            <option value='other'>Other</option>
            {albumsArr.map((album) => (
              <option key={album.id} value={album.id}>
                {album.title}
              </option>
            ))}
          </select>
        </div>
        {showNewAlbumForm && (
          <div className="new-album-form">
            <div className='input-container'>
              <label className='input-label'>
                Album Title
              </label>
              <input
                type="text"
                className='add-song-input'
                value={newAlbumTitle}
                onChange={(e) => setNewAlbumTitle(e.target.value)}
                placeholder="Enter album title"
                require={true}
              />
            </div>
            <div className='input-container'>
              <label className='input-label'>
                Album Description
              </label>
              <input
                type="text"
                className='add-song-input'
                value={newAlbumDescription}
                onChange={(e) => setNewAlbumDescription(e.target.value)}
                placeholder="Enter a description"
                require={true}
              />
            </div>
            <div className='input-container'>
              <label className='input-label'>
                Album Image URL
              </label>
              <input
                type="text"
                className='add-song-input'
                value={newAlbumImageUrl}
                onChange={(e) => setNewAlbumImageUrl(e.target.value)}
                placeholder="Enter album image URL"
                require={true}
              />
            </div>
          </div>
        )}
        <div className="input-container">
          <label htmlFor="audioFile" className="input-label">
            Audio File
          </label>
          <input type="file" accept="audio/*" onChange={updateFile}
            required
          />
        </div>
        <button type="submit" className="add-song-button">
          Submit
        </button>
      </form>
    </div>
  ) : null;
}
