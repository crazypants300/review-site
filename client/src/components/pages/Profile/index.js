import React from 'react';
import './style.css';

export default function Profile() {
  return (
    <div className="profile">
        <h1>Profile</h1>
        <div className="column">
          <div className="column is-three-fifths is-one-fifth-desktop">
            <text>[image goes here]</text>
          </div>
          <div className="column is-full is-three-fifths-desktop">
            <h1>Bio</h1>
          </div>
        </div>
        <div className="column">
          <div className="column is-two-fifths is-three-fifths-desktop">
            <h2>Reviews</h2>
          </div>
          <div className="column is-two-fifths is-three-fifths-desktop">
            <h2>Edit</h2>
          </div>
        </div>
    </div>
  );
}