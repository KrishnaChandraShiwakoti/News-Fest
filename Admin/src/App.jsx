import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Login, HomeLayout, Dashboard, News, AddNews } from "./core";
import "./Styles/App.css";
import Settings from "./core/private/Settings";
import ProfileForm from "./Components/Profile/ProfileForm";
import AccountSettings from "./Components/Profile/AccountSettings";
import EditNews from "./core/private/EditNews";
import Analytics from "./core/private/Analytics";
import { useEffect } from "react";
import { checkTokenExpiry } from "./Utils/jwt";

function App() {
  useEffect(() => {
    checkTokenExpiry();
  }, []);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeLayout />,
      // errorElement: <Error />,
      children: [
        {
          index: true,
          element: <Dashboard />,
        },
        {
          path: "news",
          element: <News />,
        },
        {
          path: "analytics",
          element: <Analytics />,
        },
        {
          path: "news/add",
          element: <AddNews />,
        },
        {
          path: "news/edit/:id",
          element: <EditNews />,
        },
        {
          path: "/settings",
          element: <Settings />,
          children: [
            {
              index: true,
              element: <ProfileForm />,
            },
            {
              path: "/settings/accountsetting",
              element: <AccountSettings />,
            },
          ],
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
      // ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
