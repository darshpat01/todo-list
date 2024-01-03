import "./App.css";
import { useContext } from "react";
import Login from "./pages/login";
import Register from "./pages/register";
import Todo from "./pages/todo";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import AuthContext from "./store/auth-context";
function App() {
  const authCtx = useContext(AuthContext);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
      errorElement: <div>404</div>,
    },
    {
      path: "/login",
      element: <Login />,
      errorElement: <div>404</div>,
    },
    {
      path: "/register",
      element: <Register />,
      errorElement: <div>404</div>,
    },
    {
      path: "/todo",
      element: authCtx.isLoggedIn ? <Todo /> : <Login />,
      errorElement: <div>404</div>,
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
