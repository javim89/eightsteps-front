import {
  Routes, Route, Navigate, Outlet,
} from "react-router-dom";
import MainLayout from "../layouts/MainLayout.tsx";
import Rooms from "./rooms.tsx";
import Room from "./room.tsx";
import Home from "./home.tsx";
import ErrorPage from "../error-page.tsx";
import useAuth from "../hooks/useAuth.tsx";

const ProtectedRoute = ({ token }: { token: string | null }) => {
  if (!token) {
    return <Navigate to={"/"} replace />;
  }

  return <Outlet />;
};

const AppRoutes = () => {
  const { token } = useAuth();

  return (
    <Routes>
      <Route element={<MainLayout />} errorElement={<ErrorPage />}>
        <Route index element={<Home />} />
        <Route element={<ProtectedRoute token={token} />}>
          <Route path="rooms" element={<Rooms />} />
          <Route path="rooms/:id" element={<Room />} />
        </Route>
      </Route>
      <Route path="*" element={<p>There's nothing here: 404!</p>} />
    </Routes>
  );
};

export default AppRoutes;
