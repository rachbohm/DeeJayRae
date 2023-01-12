import { csrfFetch } from "./csrf";

const ADD_COMMENT = "comments/ADD_COMMENT";
const LOAD_COMMENTS = "comments/LOAD_COMMENTS";
const REMOVE_COMMENT = "comments/REMOVE_COMMENTS";
const UPDATE_COMMENT = "comments/UPDATE_COMMENT";

//ACTIONS
const addCommentAction = (comment) => ({
  type: ADD_COMMENT,
  comment
});

const loadCommentsAction = (comments) => ({
  type: LOAD_COMMENTS,
  comments
});

// const removeSongAction = (songId) => ({
//   type: REMOVE_SONG,
//   songId
// });

// const updateSongAction = (song) => ({
//   type: UPDATE_SONG,
//   song
// });

// const loadSongAction = (song) => ({
//   type: LOAD_SONG,
//   song
// })

//THUNKS
export const createCommentThunk = (songId, payload) => async (dispatch) => {

  const res = await csrfFetch(`/api/songs/${songId}/comments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  if (res.ok) {
    const comment = await res.json();
    dispatch(addCommentAction(comment));
    return comment;
  }
  return res;
};

export const loadAllCommentsThunk = (songId) => async dispatch => {
  const res = await csrfFetch(`/api/songs/${songId}/comments`)
  if (res.ok) {
    const comments = await res.json();
    dispatch(loadCommentsAction(comments));
    return comments
  }
};

// export const deleteSongThunk = (songId) => async dispatch => {
//   const res = await csrfFetch(`/api/songs/${songId}`, {
//     method: 'DELETE'
//   });

//   if (res.ok) {
//     const data = await res.json();
//     window.alert("Please confirm you want to delete this song.")
//     dispatch(removeSongAction(songId))
//   }
// };

// export const editSongThunk = (payload, id) => async (dispatch) => {

//   const res = await csrfFetch(`/api/songs/${id}`, {
//     method: "PUT",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(payload)
//   });

//   if (res.ok) {
//     const song = await res.json();
//     console.log(song)
//     dispatch(updateSongAction(song));
//   }
// };

// export const getSingleSongThunk = (id) => async (dispatch) => {
//   const res = await csrfFetch(`/api/songs/${id}`);

//   if (res.ok) {
//     const song = await res.json();
//     return dispatch(loadSongAction(song))
//   }
// }

const initialState = {
}

const commentReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case ADD_COMMENT:
      newState = { ...state };
      newState[action.comment.id] = action.comment;
      return newState;
    case LOAD_COMMENTS:
      newState = { ...state };
      action.comments.Comments.forEach((comment) => {
        newState[comment.id] = comment;
      })

      return newState;
    // case REMOVE_SONG:
    //   newState = { ...state };
    //   delete newState[action.songId];
    //   return newState;
    // case UPDATE_SONG:
    //   newState = { ...state }
    //   newState[action.song.id] = action.song
    //   return newState;
    // case LOAD_SONG:
    //   newState = { ...state };
    //   newState[action.song.id] = action.song;
    //   return newState;
    default:
      return state;
  };
}

export default commentReducer
