import './CommentCard.css';
import { useSelector, useDispatch } from 'react-redux';
import { deleteCommentThunk } from '../../store/comments';

const CommentCard = ({ comment }) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);

  const isOwner = sessionUser.id === comment.userId;

  const deleteHandler = () => {
    dispatch(deleteCommentThunk(comment.id))
  };

  return (
    <div className="commentCard">
      <div>User: {comment.userId}</div>
      <div>Commented: {comment.body}</div>
      <div>At: {comment.createdAt}</div>
      {isOwner && <button onClick={deleteHandler}>Delete</button>}
    </div>
  )
}

export default CommentCard;
