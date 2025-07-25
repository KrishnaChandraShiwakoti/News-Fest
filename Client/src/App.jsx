import React, { useEffect } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  CategoriesPage,
  Error,
  ForgetPasswordLayout,
  HomeLayout,
  Landing,
  Login,
  Register,
} from "./core/public";
import BookmarkPage from "./core/private/BookmarkPage";
import EmailChecker from "./Components/EmailChecker";
import VerifyOtp from "./Components/VerifyOtp";
import ResetPassword from "./Components/ResetPassword";
import { PasswordResetProvider } from "./Components/PasswordResetContext";
import UpdateProfile from "./core/private/UpdateProfile";
import { checkTokenExpiry } from "./Utils/jwt";

function App() {
  useEffect(() => {
    checkTokenExpiry();
  }, []);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeLayout />,
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: <Landing />,
        },
        {
          path: "category/:name",
          element: <CategoriesPage />,
        },
        {
          path: "user/bookmark",
          element: <BookmarkPage />,
        },
        {
          path: "/account",
          element: <UpdateProfile />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/forgetPassword",
      element: (
        <PasswordResetProvider>
          <ForgetPasswordLayout />
        </PasswordResetProvider>
      ),
      children: [
        {
          index: true,
          element: <EmailChecker />,
        },
        {
          path: "verify-otp",
          element: <VerifyOtp />,
        },
        {
          path: "reset-password",
          element: <ResetPassword />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
