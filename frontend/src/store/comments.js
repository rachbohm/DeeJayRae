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

const removeCommentAction = (commentId) => ({
  type: REMOVE_COMMENT,
  commentId
});

const updateCommentAction = (comment) => ({
  type: UPDATE_COMMENT,
  comment
});

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

export const loadAllCommentsThunk = (songId) => async (dispatch) => {
  try {
    const res = await csrfFetch(`/api/songs/${songId}/comments`);
    if (res.ok) {
      const comments = await res.json();
      dispatch(loadCommentsAction(comments));
      return comments;
    } else if (res.status === 404) {
      return []; // Return an empty array when the song has no comments
    } else {
      throw new Error('Failed to load comments');
    }
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const deleteCommentThunk = (commentId) => async dispatch => {
  const res = await csrfFetch(`/api/comments/${commentId}`, {
    method: 'DELETE'
  });

  if (res.ok) {
    const data = await res.json();
    // window.alert("Please confirm you want to delete this comment.")
    dispatch(removeCommentAction(commentId))
  }
};

export const updateCommentThunk = (commentId, payload) => async dispatch => {
  const res = await csrfFetch(`/api/comments/${commentId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (res.ok) {
    const comment = await res.json();
    dispatch(updateCommentAction(comment));
    return comment;
  }
};


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
      newState = {};
      action.comments.Comments.forEach((comment) => {
        newState[comment.id] = comment;
      })
      return newState;
    case REMOVE_COMMENT:
      newState = { ...state };
      delete newState[action.commentId];
      return newState;
    case UPDATE_COMMENT:
      newState = { ...state };
      newState[action.comment.id] = action.comment;
      return newState;
    default:
      return state;
  };
}

export default commentReducer
