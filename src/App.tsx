import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home";
import Header from "./components/header";
import Footer from "./components/footer";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import Profile from "./pages/user/profile";
import Settings from "./pages/user/settings";
import Article from "./pages/article/article";
import Editor from "./pages/article/editor";
import Revise from "./pages/article/revise";

const router = createBrowserRouter([
  {
    path: "/",
    element: <><Header /><Home /></>
  },
  {
    path: "/login",
    element: <><Header /><Login /></>
  },
  {
    path: "/register",
    element: <><Header /><Register /></>
  },
  {
    path: "/profile/:username",
    element: <><Header /><Profile /></>
  },
  {
    path: "/article/:slug",
    element: <><Header /><Article /></>
  },
  {
    path: "/settings/:username",
    element: <><Header /><Settings /></>
  },
  {
    path: "/editor",
    element: <><Header /><Editor /></>
  },
  {
    path: "/revise/:slug",
    element: <><Header /><Revise /></>
  }
]);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
      <Footer />
    </>
  );
};

export default App;