import { csrfFetch } from "./csrf";

const ADD_SONG = "songs/ADD_SONG";
const LOAD_SONGS = "songs/LOAD_SONGS";

//ACTIONS
const addSongAction = (song) => ({
  type: ADD_SONG,
  song
});

const loadSongsAction = (songs) => ({
  type: LOAD_SONGS,
  songs
});
//THUNKS
export const createSongThunk = (payload) => async (dispatch) => {

  const res = await csrfFetch('/api/songs', {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  if (res.ok) {
    const song = await res.json();
    dispatch(addSongAction(song));
    // return song;
  }
  // else {
  //   console.log('res not ok');
  //   return;
  // }
};

export const loadAllSongsThunk = () => async dispatch => {
  const res = await csrfFetch('/api/songs')
  if (res.ok) {
    const songs = await res.json();
    dispatch(loadSongsAction(songs))
    return songs
  }
}

const initialState = {
}

const songReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case ADD_SONG:
      newState = { ...state };
      newState[action.song.id] = action.song;
      return newState;
    case LOAD_SONGS:
      newState = { ...state };
      action.songs.Songs.forEach((song) => {
        newState[song.id] = song;
      })
      return newState;
    default:
      return state;
  };
}

export default songReducer
