// UserProfile.js

import React, { useEffect } from 'react';
import { useSelector , useDispatch } from 'react-redux';
import { handleCurrentUser } from '../services/authService';
import './UserProfile.css'; 
import { userLogout } from "../redux/features/auth/authSlice";


function UserProfile() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.auth);


  const handleLogout = () => {
    dispatch(userLogout());
  };


  useEffect(() => {
    if (data.user) {
      handleCurrentUser(data.user);
    }
  }, []);

  

  return (
    <div className="user-profile-container">
      <h1 className="user-profile-heading">User Profile</h1>
      {data.user && (
        <div>
          <div className="user-profile-item">
            <span className="user-profile-label">First Name:</span>
            <span className="user-profile-value">{data.user.firstName}</span>
          </div>
          <div className="user-profile-item">
            <span className="user-profile-label">Last Name:</span>
            <span className="user-profile-value">{data.user.lastName}</span>
          </div>
          <div className="user-profile-item">
            <span className="user-profile-label">Mobile Number:</span>
            <span className="user-profile-value">{data.user.mobileNumber}</span>
          </div>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
}

export default UserProfile;
