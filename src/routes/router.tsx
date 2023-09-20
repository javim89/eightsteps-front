import {
  createBrowserRouter,
} from "react-router-dom";
import MainLayout from "../layouts/MainLayout.tsx";
import Rooms from "./rooms.tsx";
import Room from "./room.tsx";
import Home from "./home.tsx";
import ErrorPage from "../error-page.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "rooms",
        element: <Rooms />,
      },
      {
        path: "rooms/:id",
        element: <Room />,
      },
    ],
  },
]);

export default router;
