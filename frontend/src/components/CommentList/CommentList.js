import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './CommentList.css';
import { loadAllCommentsThunk } from '../../store/comments';
import CommentCard from '../CommentCard/CommentCard';
import CommentForm from '../CommentForm/CommentForm';

const CommentList = ({ song }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadAllCommentsThunk(song.id))
  }, [dispatch, song.id]);

  let comments = useSelector(state => state.commentsState);
  let commentsArr = Object.values(comments);
  const filteredComments = commentsArr.filter(comment => { return comment.songId == song.id });

  return (
    <div className="comment-list-container">
      <div className='comment-form-container-container'>
        <CommentForm song={song} />
      </div>
      {filteredComments.length > 0 && <div className="comment-list">
        <h2>Comments</h2>
        {filteredComments.map((comment) => (
          <CommentCard key={comment.id} comment={comment} />
        ))}
      </div>
      }
      {filteredComments.length == 0 && <div className="comment-list">
        <h2>Comments</h2>
        <i className="fa-solid fa-comment-slash"></i>
        <p>No comments yet</p>
        </div>}
    </div>
  )
};

export default CommentList;
