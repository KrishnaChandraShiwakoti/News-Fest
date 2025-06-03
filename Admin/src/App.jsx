import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Login, HomeLayout, Dashboard, News } from "./Pages";

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
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
