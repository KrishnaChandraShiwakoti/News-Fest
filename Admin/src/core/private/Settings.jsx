import "../../Styles/Settings.css";
import Header from "../../Components/Profile/Header";
import Sidebar from "../../Components/Profile/Sidebar";
import { Outlet } from "react-router-dom";
const Settings = () => {
  return (
    <div className="profile-container">
      <Header />
      <div className="profile-main-content">
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
};

export default Settings;
