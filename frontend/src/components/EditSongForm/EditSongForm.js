import './EditSongForm.css';
import { editSongThunk, createSongThunk } from "../../store/songs";
import { getSingleSongThunk } from '../../store/songs';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

const EditSongForm = () => {

  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user);
  const { songId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSingleSongThunk(songId))
  }, [dispatch, songId]);

  const song = useSelector(state => state.songsState[songId]);

    const [title, setTitle] = useState(song.title)
    const [description, setDescription] = useState(song.description)
    const [url, setUrl] = useState(song.url)
    const [imageUrl, setImageUrl] = useState(song.previewImage)
    const [albumId, setAlbumId] = useState(song.albumId)


  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      title,
      description,
      url,
      imageUrl,
      albumId
    };

    await dispatch(editSongThunk(payload, songId))
    //   .then(() => {
    //     history.push(`/songs/${songId}`)
    // })
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

export default EditSongForm;
