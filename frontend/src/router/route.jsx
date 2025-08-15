import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Pets from "../pages/PetsPage";
import PetDetailPage from "../pages/PetDetailPage";
import ProfilePage from "../pages/ProfilePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "pets",
        element: <Pets />,
      },
      { path: "pets/:id", element: <PetDetailPage /> },
      {
        path: "profile",
        element: <ProfilePage />,
      },
    ],
  },
]);

export default router;
