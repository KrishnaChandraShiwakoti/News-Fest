import React, { useState } from "react";

const ProfileForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  return (
    <div className="profile-form">
      <h3>My Profile</h3>
      <label>Name</label>
      <div className="input-row">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button className="edit-icon">✏️</button>
      </div>

      <label>Email</label>
      <div className="input-row">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="edit-icon">✏️</button>
      </div>

      <div className="form-actions">
        <button className="save-btn">Save</button>
        <button className="cancel-btn">Cancel</button>
      </div>
    </div>
  );
};

export default ProfileForm;
