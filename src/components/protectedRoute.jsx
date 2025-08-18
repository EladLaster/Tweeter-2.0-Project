import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/userContext";

export function ProtectedRoute({ children }) {
  const { user } = useContext(UserContext);

  if (!user) {
    // לא מחובר → ניתוב ל-login
    return <Navigate to="/login" replace />;
  }

  // מחובר → מציג את הדף
  return children;
}
