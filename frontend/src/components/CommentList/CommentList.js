import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './CommentList.css';
import { loadAllCommentsThunk } from '../../store/comments';
import CommentCard from '../CommentCard/CommentCard';
import CommentForm from '../CommentForm/CommentForm';

const CommentList = ({song}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadAllCommentsThunk(song.id))
  }, [dispatch, song.id]);

  let comments = useSelector(state => state.commentsState);
  let commentsArr = Object.values(comments);

  return (
    <div> Comments
      <CommentForm song={song} />
      <div>
        {commentsArr.map((comment) => (
          <CommentCard key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  )
};

export default CommentList;
