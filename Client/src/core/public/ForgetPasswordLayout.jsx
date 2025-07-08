import { Outlet } from "react-router-dom";

function ForgetPasswordLayout() {
  return (
    <div>
      {/* maybe a header or wrapper div */}
      <Outlet />
    </div>
  );
}

export default ForgetPasswordLayout;
