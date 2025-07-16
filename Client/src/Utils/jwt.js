import { jwtDecode } from "jwt-decode";
export function onLoginSuccess(token) {
  localStorage.setItem("token", token);

  const decoded = jwtDecode(token);
  const expiryTime = decoded.exp * 1000; // convert to milliseconds
  const currentTime = Date.now();
  const timeout = expiryTime - currentTime;

  if (timeout > 0) {
    setTimeout(() => {
      handleLogout();
    }, timeout);
  } else {
    handleLogout(); // if already expired
  }
}

export function handleLogout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  alert("Session expired. Please login again.");
  window.location.href = "/login";
}
export function checkTokenExpiry() {
  const token = localStorage.getItem("token");
  if (token) {
    const decoded = jwtDecode(token);
    const expiryTime = decoded.exp * 1000;
    const currentTime = Date.now();

    if (currentTime >= expiryTime) {
      handleLogout();
    } else {
      setTimeout(() => {
        handleLogout();
      }, expiryTime - currentTime);
    }
  }
}
