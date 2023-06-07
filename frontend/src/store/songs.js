import { csrfFetch } from "./csrf";

const ADD_SONG = "songs/ADD_SONG";
const LOAD_SONGS = "songs/LOAD_SONGS";
const REMOVE_SONG = "songs/REMOVE_SONG";
const UPDATE_SONG = "songs/UPDATE_SONG";
const LOAD_SONG = "songs/LOAD_SONG";

//ACTIONS
const addSongAction = (song) => ({
  type: ADD_SONG,
  song
});

const loadSongsAction = (songs) => ({
  type: LOAD_SONGS,
  songs
});

const removeSongAction = (songId) => ({
  type: REMOVE_SONG,
  songId
});

const updateSongAction = (song) => ({
  type: UPDATE_SONG,
  song
});

const loadSongAction = (song) => ({
  type: LOAD_SONG,
  song
});

//THUNKS
export const createSongThunk = (payload) => async (dispatch) => {
  console.log("payload entering thunk", payload)
  const { title, description, url, imageUrl, albumId, audioFile } = payload;
  const formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);
  formData.append("url", url);
  formData.append("imageUrl", imageUrl);
  formData.append("albumId", albumId);
  formData.append("audioFile", audioFile);

  const res = await csrfFetch('/api/songs', {
    method: "POST",
    headers: { "Content-Type": "multipart/form-data" },
    body: formData
  });


    const data = await res.json();
    dispatch(addSongAction(data.song));
    return res;

};

export const loadAllSongsThunk = () => async dispatch => {
  const res = await csrfFetch('/api/songs')
  if (res.ok) {
    const songs = await res.json();
    dispatch(loadSongsAction(songs))
    return songs
  }
};

export const deleteSongThunk = (songId) => async dispatch => {
  const res = await csrfFetch(`/api/songs/${songId}`, {
    method: 'DELETE'
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(removeSongAction(songId))
  }
};

export const editSongThunk = (payload, id) => async (dispatch) => {

  const res = await csrfFetch(`/api/songs/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  if (res.ok) {
    const song = await res.json();
    dispatch(updateSongAction(song));
  }
};

export const getSingleSongThunk = (id) => async (dispatch) => {
  const res = await csrfFetch(`/api/songs/${id}`);

  if (res.ok) {
    const song = await res.json();
    return dispatch(loadSongAction(song))
  }
}

const initialState = {
}

const songReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case ADD_SONG:
      newState = { ...state };
      // newState[action.song.id] = action.song;
      return newState;
    case LOAD_SONGS:
      newState = { ...state };
      action.songs.Songs.forEach((song) => {
        newState[song.id] = song;
      })
      return newState;
    case REMOVE_SONG:
      newState = { ...state };
      delete newState[action.songId];
      return newState;
    case UPDATE_SONG:
      newState = { ...state }
      newState[action.song.id] = action.song
      return newState;
    case LOAD_SONG:
      newState = { ...state };
      newState[action.song.id] = action.song;
      return newState;
    default:
      return state;
  };
}

export default songReducer
