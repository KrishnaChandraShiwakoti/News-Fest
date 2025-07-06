import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  CategoriesPage,
  Error,
  HomeLayout,
  Landing,
  Login,
  Register,
} from "./core/public";
import BookmarkPage from "./core/private/BookmarkPage";

function App() {
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
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
