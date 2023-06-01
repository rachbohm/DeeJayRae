import { createPlaylistThunk } from "../../store/playlists";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { loadAllSongsThunk } from "../../store/songs";
import './PlaylistForm.css';

export default function PlaylistForm() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  const [name, setName] = useState('');
  const [previewImage, setPreviewImage] = useState('https://media.istockphoto.com/id/1034671212/vector/cassette-with-retro-label-as-vintage-object-for-80s-revival-mix-tape-design.jpg?s=612x612&w=0&k=20&c=ILi5E7_zIBJk1ksjmMGA2mHJ31QZ1__C9nD4NeduxGo=');
  const [selectedSongs, setSelectedSongs] = useState([]); // State for selected songs
  const [searchQuery, setSearchQuery] = useState('');

  const [errors, setErrors] = useState([]);

  useEffect(() => {
    dispatch(loadAllSongsThunk()).then(() => setIsLoaded(true))
  }, [dispatch]);

  const sessionUser = useSelector(state => state.session.user);
  const songs = useSelector(state => state.songsState);
  const songsArr = Object.values(songs).sort((a, b) => a.title.localeCompare(b.title));

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors([]);

    if (selectedSongs.length === 0) {
      setErrors(["Please select at least one song."]);
      return;
    }

    const payload = {
      name,
      previewImage,
      songIds: selectedSongs, // Pass selected song IDs in the payload
    };

    await dispatch(createPlaylistThunk(payload))
      .then(() => {
        window.alert('Playlist successfully created');
        history.push('/playlists');
      }
      ).catch(async res => {
        const data = await res.json();
        if (data.errors) setErrors(data.errors);
      }
      );
  };

  const handleSongSelect = (songId) => {
    if (selectedSongs.includes(songId)) {
      // If the song is already selected, remove it from the selection
      setSelectedSongs(selectedSongs.filter(id => id !== songId));
    } else {
      // If the song is not selected, add it to the selection
      setSelectedSongs([...selectedSongs, songId]);
    }
  };

  const filteredSongs = songsArr.filter(song => {
    const searchTerm = searchQuery.toLowerCase();
    return (
      song.title.toLowerCase().includes(searchTerm) ||
      song.Artist.firstName.toLowerCase().includes(searchTerm) ||
      song.Artist.lastName.toLowerCase().includes(searchTerm)
    );
  });

  return sessionUser.id && isLoaded ? (
    <div className="add-playlist-container">
      {errors.length > 0 && errors.map((error, i) => (
        <div key={i} className="error-message">{error}</div>
      ))}
      <form className="add-playlist-form" onSubmit={handleSubmit}>
        <h1 className="add-playlist-title">Create a Playlist!</h1>
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
        <label className="add-playlist-label select-songs">Select Songs</label>
        <input
          className="search-bar"
          type="text"
          placeholder="Search songs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="checkboxes-and-button">
          <div className="song-checkboxes">
            {filteredSongs.length > 0 ? filteredSongs.map((song) => (
              <label key={song.id} className="song-checkbox-label">
                <div>
                  <input
                    type="checkbox"
                    name="songIds"
                    value={song.id}
                    checked={selectedSongs.includes(song.id)}
                    onChange={() => handleSongSelect(song.id)}
                  />
                  {song.title} by {song.Artist.firstName} {song.Artist.lastName}
                </div>
              </label>
            )) : <div>No songs found. Try another search term.</div>}
          </div>
          <div className="selected-songs-and-button">
            <div className="selected-songs">
              <span className="selected-songs-title">Selected Songs:</span>
              {selectedSongs.length > 0 ? selectedSongs.map((songId) => (
                <li key={songId} className="selected-song">
                  {songs[songId].title} by {songs[songId].Artist.firstName} {songs[songId].Artist.lastName}
                </li>
              )) : <div>No songs selected.</div>}
            </div>
            <button className="add-playlist-button" type="submit">Create Playlist</button>
          </div>
        </div>
      </form>
    </div>
  ) : null;
}
