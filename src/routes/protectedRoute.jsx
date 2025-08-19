import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/userContext";

export function ProtectedRoute({ children }) {
  const { user, loadingUser } = useContext(UserContext);

  if (loadingUser) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
