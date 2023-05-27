import './CommentCard.css';
import { useSelector, useDispatch } from 'react-redux';
import { deleteCommentThunk, updateCommentThunk } from '../../store/comments';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';

const CommentCard = ({ comment }) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const history = useHistory();
  const [commentBody, setCommentBody] = useState(comment.body); // State to track comment body
  const [isEditing, setIsEditing] = useState(false); // State to track edit mode
  const [editedCommentBody, setEditedCommentBody] = useState(comment.body);

  const isOwner = sessionUser.id === comment.userId;

  const deleteHandler = () => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      dispatch(deleteCommentThunk(comment.id))
    }
    else return;
  };

  const editHandler = () => {
    setIsEditing(true); // Enable edit mode
  };

  const saveHandler = () => {
    // Handle saving the edited comment, e.g., dispatch an action or make an API call
    // In this example, we're updating the local state only
    setCommentBody(editedCommentBody);
    setIsEditing(false); // Disable edit mode
    dispatch(updateCommentThunk(comment.id, { body: editedCommentBody }));
  };

  return (
    <div className="commentCard">
      <div className="comment-user">User {comment.User.username}</div>
      {isEditing ? (
        <input
          type="text"
          value={editedCommentBody}
          onChange={(e) => setEditedCommentBody(e.target.value)}
        />
      ) : (
        <div className="comment-body">{commentBody}</div>
      )}
      {isOwner && (
        <div className="comment-owner">
          <button onClick={deleteHandler}>Delete</button>
          {isEditing ? (
            <button onClick={saveHandler}>Save</button>
          ) : (
            <button onClick={editHandler}>Edit</button>
          )}
        </div>
      )}
    </div>
  );
};

export default CommentCard;
