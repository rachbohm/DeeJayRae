import { createPlaylistThunk } from "../../store/playlists";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { loadAllSongsThunk } from "../../store/songs";
import React from 'react';
import './PlaylistForm.css';

export default function PlaylistForm() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [name, setName] = useState('');
  const [previewImage, setPreviewImage] = useState('https://media.istockphoto.com/id/1034671212/vector/cassette-with-retro-label-as-vintage-object-for-80s-revival-mix-tape-design.jpg?s=612x612&w=0&k=20&c=ILi5E7_zIBJk1ksjmMGA2mHJ31QZ1__C9nD4NeduxGo=');
  const [selectedSongs, setSelectedSongs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    dispatch(loadAllSongsThunk()).then(() => setIsLoaded(true));
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
      songIds: selectedSongs,
    };

    if (window.confirm("Are you sure you want to create this playlist?")) {
      try {
        await dispatch(createPlaylistThunk(payload));
        window.alert('Playlist successfully created');
        history.push('/playlists');
      } catch (res) {
        const data = await res.json();
        if (data.errors) setErrors(data.errors);
      }
    }
  };

  const handleSongSelect = (songId) => {
    setSelectedSongs(prevSelectedSongs => {
      if (prevSelectedSongs.includes(songId)) {
        return prevSelectedSongs.filter(id => id !== songId);
      } else {
        return [...prevSelectedSongs, songId];
      }
    });
  };

  const handleClearOne = (e, songId) => {
    e.preventDefault();
    setSelectedSongs(prevSelectedSongs => {
      return prevSelectedSongs.filter(id => id !== songId);
    });
  };

  const handleClearAll = (e) => {
    e.preventDefault();
    setSelectedSongs([]);
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
      <form className="add-playlist-form" onSubmit={handleSubmit}>
        {errors.length > 0 && (
          <div className="error-message">
            {errors.map((error, i) => (
              <span key={i}>{error}</span>
            ))}
          </div>
        )}
        <h1 className="add-playlist-title">Create a Playlist!</h1>
        <label className="add-playlist-label">Name</label>
        <input
          className="add-playlist-input"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <div className='preview-image-container'>
          <label className="add-playlist-label preview-image-label">Preview Image URL</label>
          <div className="preview-image-input-container">
            <input
              className="add-playlist-input preview-image-input"
              type="text"
              value={previewImage}
              onChange={(e) => setPreviewImage(e.target.value)}
              required
            />
            <img className='preview-image' src={previewImage} alt='Preview' />
          </div>
        </div>
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
            {filteredSongs.length > 0 ? (
              filteredSongs.map((song) => (
                <label key={song.id} className="song-checkbox-label">
                  <div>
                    <input
                      type="checkbox"
                      name="songIds"
                      value={song.id}
                      checked={selectedSongs.includes(song.id)}
                      onChange={() => handleSongSelect(song.id)}
                    />
                    <span className="selected-song-title">{song.title}</span>
                    <span className="selected-song-artist">
                      - {song.Artist.firstName} {song.Artist.lastName}
                    </span>
                  </div>
                </label>
              ))
            ) : (
              <div>No songs found. Try another search term.</div>
            )}
          </div>
          <div className="selected-songs-and-button">
            <div className="selected-songs">
              <span className="selected-songs-title">Selected Songs:</span>
              {selectedSongs.length > 0 ? (
                <React.Fragment>
                  <button className="clear-songs-button" onClick={(e)=>handleClearAll(e)}>Clear All</button>
                  <ul className="selected-songs-list">
                    {selectedSongs.map((songId) => (
                      <div className='selected-song-container'>
                        <li key={songId} className="selected-song-li">
                          <span className="selected-song-bullet">&#8226;</span>
                          <div className="selected-song-details">
                            <span className="selected-song-title">{songs[songId].title}</span>
                            <span className="selected-song-artist">
                              - {songs[songId].Artist.firstName} {songs[songId].Artist.lastName}
                            </span>
                          </div>
                        </li>
                        <button type="button" className="clear-song-button" onClick={(e) => handleClearOne(e, songId)}>Remove</button>
                      </div>
                    ))}
                  </ul>
                </React.Fragment>
              ) : (
                <div>No songs selected.</div>
              )}
            </div>
            <button className="add-playlist-button" type="submit">
              Create Playlist
            </button>
          </div>
        </div>
      </form>
    </div>
  ) : null;
}
