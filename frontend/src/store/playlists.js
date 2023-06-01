import { csrfFetch } from "./csrf";

const ADD_PLAYLIST = "playlists/ADD_PLAYLIST";
const LOAD_PLAYLISTS = "playlists/LOAD_PLAYLISTS";
const REMOVE_PLAYLIST = "playlists/REMOVE_PLAYLIST";
const UPDATE_PLAYLIST = "playlists/UPDATE_PLAYLIST";
const LOAD_PLAYLIST = "playlists/LOAD_PLAYLIST";

//ACTIONS
const addPlaylistAction = (playlist) => ({
  type: ADD_PLAYLIST,
  playlist
});

const loadPlaylistsAction = (playlists) => ({
  type: LOAD_PLAYLISTS,
  playlists
});

const removePlaylistAction = (playlistId) => ({
  type: REMOVE_PLAYLIST,
  playlistId
});

const updatePlaylistAction = (playlist) => ({
  type: UPDATE_PLAYLIST,
  playlist
});

const loadPlaylistAction = (playlist) => ({
  type: LOAD_PLAYLIST,
  playlist
});

//THUNKS
export const createPlaylistThunk = (payload) => async (dispatch) => {

    const res = await csrfFetch('/api/playlists', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      const playlist = await res.json();
      dispatch(addPlaylistAction(playlist));
      return playlist;
    }
    return res;
}

export const loadAllPlaylistsThunk = () => async dispatch => {
  const res = await csrfFetch('/api/playlists')
  if (res.ok) {
    const playlists = await res.json();
    dispatch(loadPlaylistsAction(playlists))
    return playlists
  }
}

export const loadPlaylistThunk = (playlistId) => async dispatch => {
  const res = await csrfFetch(`/api/playlists/${playlistId}`)
  if (res.ok) {
    const playlist = await res.json();
    dispatch(loadPlaylistAction(playlist))
    return playlist
  }
}

export const updatePlaylistThunk = (playlistId, payload) => async dispatch => {
  const res = await csrfFetch(`/api/playlists/${playlistId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  })
  if (res.ok) {
    const playlist = await res.json();
    dispatch(updatePlaylistAction(playlist))
    return playlist
  }
}

export const deletePlaylistThunk = (playlistId) => async dispatch => {
  const res = await csrfFetch(`/api/playlists/${playlistId}`, {
    method: "DELETE"
  })
  if (res.ok) {
    const playlist = await res.json();
    dispatch(removePlaylistAction(playlist.id))
    return playlist
  }
}

//REDUCER
const initialState = {};

const playlistsReducer = (state = initialState, action) => {

  switch (action.type) {
    case ADD_PLAYLIST:
      return {  };
    case LOAD_PLAYLISTS:
      const allPlaylists = {};
      action.playlists.Playlists.forEach(playlist => {
        allPlaylists[playlist.id] = playlist;
      });
      return { ...allPlaylists };
    case REMOVE_PLAYLIST:
      const newState = { ...state };
      delete newState[action.playlistId];
      return newState;
    case UPDATE_PLAYLIST:
      return {  };
    case LOAD_PLAYLIST:
      return { ...state, [action.playlist.id]: action.playlist };
    default:
      return state;
  }
}

export default playlistsReducer;
