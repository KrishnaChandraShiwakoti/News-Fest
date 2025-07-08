import React, { createContext, useContext, useState } from "react";

const PasswordResetContext = createContext();

export const PasswordResetProvider = ({ children }) => {
  const [email, setEmail] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);

  return (
    <PasswordResetContext.Provider
      value={{ email, setEmail, otpVerified, setOtpVerified }}>
      {children}
    </PasswordResetContext.Provider>
  );
};

export const usePasswordReset = () => useContext(PasswordResetContext);
