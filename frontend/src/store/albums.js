import { csrfFetch } from './csrf';

const LOAD_ALBUMS = "albums/LOAD_ALBUMS";
const LOAD_ALBUM = "albums/LOAD_ALBUM";
const ADD_ALBUM = "albums/ADD_ALBUM";
const REMOVE_ALBUM = "albums/REMOVE_ALBUM";
const UPDATE_ALBUM = "albums/UPDATE_ALBUM";

//ACTIONS
const loadAlbumsAction = (albums) => ({
  type: LOAD_ALBUMS,
  albums
});

const loadAlbumAction = (album) => ({
  type: LOAD_ALBUM,
  album
});

const addAlbumAction = (album) => ({
  type: ADD_ALBUM,
  album
});

const removeAlbumAction = (albumId) => ({
  type: REMOVE_ALBUM,
  albumId
});

const updateAlbumAction = (album) => ({
  type: UPDATE_ALBUM,
  album
});

//THUNKS
export const loadAllAlbumsThunk = () => async dispatch => {
  const res = await csrfFetch('/api/albums')
  if (res.ok) {
    const albums = await res.json();
    dispatch(loadAlbumsAction(albums))
    return albums
  }
}

export const loadAlbumThunk = (albumId) => async dispatch => {
  const res = await csrfFetch(`/api/albums/${albumId}`)
  if (res.ok) {
    const album = await res.json();
    dispatch(loadAlbumAction(album))
    return album
  }
}

export const createAlbumThunk = (payload) => async (dispatch) => {
    console.log('payload in createAlbumThunk', payload)
    const res = await csrfFetch('/api/albums', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      const album = await res.json();
      dispatch(addAlbumAction(album));
      console.log('album', album)
      return album;
    }
    return res;
}

export const updateAlbumThunk = (albumId, payload) => async (dispatch) => {

      const res = await csrfFetch(`/api/albums/${albumId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        const album = await res.json();
        dispatch(updateAlbumAction(album));
        return album;
      }
      return res;
}

export const deleteAlbumThunk = (albumId) => async (dispatch) => {

        const res = await csrfFetch(`/api/albums/${albumId}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        });

        if (res.ok) {
          const album = await res.json();
          dispatch(removeAlbumAction(album.id));
          return album;
        }
        return res;
}

//reducer for albums
const initialState = {};


const albumReducer = (state = initialState, action) => {

  switch (action.type) {
    case ADD_ALBUM:
      return { ...state, [action.album.id]: action.album };
    case LOAD_ALBUMS:
      const allAlbums = {};
      action.albums.Albums.forEach(album => {
        allAlbums[album.id] = album;
      });
      return { ...state, ...allAlbums };
    case REMOVE_ALBUM:
      const newState = { ...state };
      delete newState[action.albumId];
      return newState;
    case UPDATE_ALBUM:
      return { ...state, [action.album.id]: action.album };
    case LOAD_ALBUM:
      return { ...state, [action.album.id]: action.album };
    default:
      return state;
  }
}

export default albumReducer;
