import { csrfFetch } from "./csrf";

const LOAD_MY_SONGS = "songs/LOAD_MY_SONGS"

const loadMySongsAction = (songs) => ({
  type: LOAD_MY_SONGS,
  songs
})

export const loadMySongsThunk = () => async dispatch => {
  const res = await csrfFetch('/api/songs/current')
  if (res.ok) {
    const songs = await res.json();
    dispatch(loadMySongsAction(songs));
    return songs
  }
};

const initialState = {}

const currentReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case LOAD_MY_SONGS:
      newState = { ...state };
      action.songs.forEach((song) => {
        newState[song.id] = song;
      });
      return newState;
    default:
      return state;
  }
}

export default currentReducer
