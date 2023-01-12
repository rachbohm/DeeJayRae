import './CommentCard.css';
import { useSelector, useDispatch } from 'react-redux';

const CommentCard = ({ comment }) => {

  return (
    <div className="commentCard">
      <div>User: {comment.userId}</div>
      <div>Commented: {comment.body}</div>
      <div>At: {comment.createdAt}</div>
    </div>
  )
}

export default CommentCard;
