import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { loadAllPlaylistsThunk, updatePlaylistThunk } from '../../store/playlists';
import { loadAllSongsThunk } from '../../store/songs';
import './EditPlaylist.css';

export default function EditPlaylist() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [errors, setErrors] = useState([]);

  const sessionUser = useSelector(state => state.session.user);
  const playlists = useSelector(state => state.playlistsState);
  const songs = useSelector(state => state.songsState);

  const playlistId = Number(history.location.pathname.split('/')[2]);
  console.log('playlistId', playlistId)

  useEffect(() => {
    dispatch(loadAllPlaylistsThunk());
    dispatch(loadAllSongsThunk()).then(() => {
      setIsLoaded(true);
    }
    );
  }, [dispatch, playlistId]);

  let thisPlaylist;
  if (playlists && isLoaded) {
    thisPlaylist = playlists[playlistId];
  }
  console.log('isLoaded', isLoaded)
  console.log('playlists', playlists)
  console.log('thisPlaylist', thisPlaylist)

  const isOwner = thisPlaylist && sessionUser.id === thisPlaylist.userId;

  const [name, setName] = useState('');
  const [previewImage, setPreviewImage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSongs, setSelectedSongs] = useState([]);

  useEffect(() => {
    if (thisPlaylist) {
      setName(thisPlaylist.name);
      setPreviewImage(thisPlaylist.previewImage);
      setSelectedSongs(thisPlaylist.Songs.map(song => song.id));
    }
  }, [thisPlaylist]);

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
    setSelectedSongs(prevSelectedSongs => prevSelectedSongs.filter(id => id !== songId));
  };

  const handleClearAll = (e) => {
    e.preventDefault();
    setSelectedSongs([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      name,
      previewImage,
      songIds: selectedSongs,
    };
    setSelectedSongs([]);
    setName('');
    setPreviewImage('');

    if (window.confirm("Are you sure you want to update this playlist?")) {
      try {
        await dispatch(updatePlaylistThunk(playlistId, payload)).then(() => {
          window.alert('Playlist successfully updated');
          history.push(`/playlists/${playlistId}`);
        });
      } catch (res) {
        const data = await res.json();
        if (data.errors) {
          window.alert('Something went wrong. Please try again.');
        }
      }
    }
  };

  const filteredSongs = songs
  ? Object.values(songs).filter(song => {
      const searchTerm = searchQuery.toLowerCase();
      return (
        song.title.toLowerCase().includes(searchTerm) ||
        song.Artist.firstName.toLowerCase().includes(searchTerm) ||
        song.Artist.lastName.toLowerCase().includes(searchTerm)
      );
    })
  : [];


  if (!sessionUser || !thisPlaylist) {
    return null;
  }

  return isOwner && isLoaded ? (
    <div className="add-playlist-container">
      <form className="add-playlist-form" onSubmit={handleSubmit}>
      {errors.length > 0 && (
          <div className="error-message">
            {errors.map((error, i) => (
              <span key={i}>{error}</span>
            ))}
          </div>
        )}
        <h1 className="add-playlist-title">{thisPlaylist.name}</h1>
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
                <>
                  <button className="clear-songs-button" onClick={handleClearAll}>
                    Clear All
                  </button>
                  <ul className="selected-songs-list">
                    {selectedSongs.map((songId) => {
                      const song = songs[songId];
                      if (!song) {
                        return null; 
                      }
                      return (
                        <div className="selected-song-container" key={songId}>
                          <li className="selected-song-li">
                            <span className="selected-song-bullet">&#8226;</span>
                            <div className="selected-song-details">
                              <span className="selected-song-title">{song.title}</span>
                              <span className="selected-song-artist">
                                - {song.Artist.firstName} {song.Artist.lastName}
                              </span>
                            </div>
                          </li>
                          <button
                            type="button"
                            className="clear-song-button"
                            onClick={(e) => handleClearOne(e, songId)}
                          >
                            Remove
                          </button>
                        </div>
                      );
                    })}
                  </ul>
                </>
              ) : (
                <div>No songs selected.</div>
              )}
            </div>
            <button className="add-playlist-button" type="submit">
              Save Playlist
            </button>
          </div>
        </div>
      </form>
    </div>
  ) : (
    <div className="not-authorized">You are not authorized to edit this playlist.</div>
  )
}
