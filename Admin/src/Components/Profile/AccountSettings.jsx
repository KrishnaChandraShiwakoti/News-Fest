import React, { useState } from "react";

const AccountSettings = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleUpdatePassword = () => {
    if (newPassword !== confirmPassword) {
      alert("New passwords don't match!");
      return;
    }
    alert("Password updated successfully (simulated).");
  };

  const handleDeleteAccount = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );
    if (confirmDelete) {
      alert("Account deleted (simulated).");
    }
  };

  return (
    <div className="account-settings">
      <h3>Account Settings</h3>
      <p>Change Password</p>

      <div className="password-inputs">
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>

      <button className="update-password-btn" onClick={handleUpdatePassword}>
        Update Password
      </button>

      <hr />

      <h4>Delete Account</h4>
      <p>
        Once you delete your account, there is no going back. Please be certain.
      </p>
      <button className="delete-account-btn" onClick={handleDeleteAccount}>
        Delete Account
      </button>
    </div>
  );
};

export default AccountSettings;
