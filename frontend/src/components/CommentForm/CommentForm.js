import './CommentForm.css';
import { createCommentThunk } from '../../store/comments';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const CommentForm = ({ song }) => {

  const sessionUser = useSelector(state => state.session.user);

  const notOwner = sessionUser.id !== song.userId;

  const dispatch = useDispatch();

  const [body, setBody] = useState('');
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    const payload = {
      body
    };

    await dispatch(createCommentThunk(song.id, payload))
      .then(() => {
        setBody('');
      }).catch(async res => {
        const data = await res.json();
        if (data.errors) setErrors(data.errors);
      })
  };

  return sessionUser.id && notOwner ? (
    <div className='comment-form-container'>
      {errors.length > 0 && errors.map((error, i) => {
        return <div key={i}>{error}</div>
      })}
      <h2>Leave a Comment!</h2>
      <form className="add-comment-form" onSubmit={handleSubmit}>
        <input className="comment-input"
          type="text"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Write your comment here"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  ) : sessionUser.id && !notOwner ? null : (
    <h3>
      Please
      <a href="/login">login</a>
      to leave a comment!
    </h3>
  );

}

export default CommentForm;
