import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Login, HomeLayout, Dashboard, News, AddNews } from "./core";
import "./Styles/App.css";
import Settings from "./core/private/Settings";
import ProfileForm from "./Components/Profile/ProfileForm";
import AccountSettings from "./Components/Profile/AccountSettings";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeLayout />,
      errorElement: <Error />,
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
          path: "news/add",
          element: <AddNews />,
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
      // children: [
      //   {
      //     path: "/forget",
      //   },
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
