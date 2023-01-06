import { csrfFetch } from "./csrf";

const ADD_SONG = "songs/ADD_SONG";
const GET_SONGS = "songs/GET_SONGS";

const addSongAction = (song) => ({
  type: ADD_SONG,
  song
});

const getSongsAction = (songs) => ({
  type: GET_SONGS,
  songs
});

export const createSongThunk = (payload) => async (dispatch) => {

  const res = await csrfFetch('/api/songs', {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  if (res.ok) {
    const song = await res.json();
    dispatch(addSongAction(song));
    return song;
  } else {
    console.log('res not ok')
  }
};

export const getAllSongsThunk = () => async dispatch => {
  const res = await csrfFetch('/api/songs')
  if (res.ok) {
    const songs = await res.json()
    dispatch(getSongsAction(songs))
    return songs
  }
}

export const getSongsHelper = state => Object.values(state.songsState.allSongs)

const initialState = {
  allSongs: {}
}

const songReducer = (state = initialState, action) => {
  const newState = { ...state }
  switch (action.type) {
    case ADD_SONG:
      newState.allSongs[action.song.id] = action.song
      return newState;
    case GET_SONGS:
      action.songs.Songs.forEach((song) => {
        newState.allSongs[song.id] = song;
      })
      return newState;
    default:
      return state;
  };
}

export default songReducer
