import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";

export default function Profile() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [image, setImage] = useState(sessionUser.image);
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      image,
    }
    return dispatch(sessionActions.updateUserThunk(user))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  };

  const updateFile = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };

  if (!sessionUser.id) return <Redirect to="/login" />;


  return (
    <div className="profile-container">
      <form onSubmit={handleSubmit} className="profile-form">
        <ul className="error-message">
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <label htmlFor="image">
          <input

            type="file"
            id="image"
            onChange={updateFile}
          />
        </label>
        <button type="submit">Update Profile</button>
      </form>
    </div>
  )
}
