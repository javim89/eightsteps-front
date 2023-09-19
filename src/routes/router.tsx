import {
  createBrowserRouter,
} from "react-router-dom";
import MainLayout from "../layouts/MainLayout.tsx";
import Rooms from "./rooms.tsx";
import ErrorPage from "../error-page.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [{
      path: "rooms",
      element: <Rooms />,
    }],
  },
]);

export default router;
