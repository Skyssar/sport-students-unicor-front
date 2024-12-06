import { createBrowserRouter } from "react-router-dom";
import Login from "./Components/Login";
import App from "./App";
import Form from "./Components/Form";
import SportHistory from "./Components/SportHistory";
import Register from "./Components/Register";
import Admin from "./Components/Admin";
import Dashboard from "./Components/admin/Dashboard";
import AdminTemplate from "./Components/admin/AdminTemplate";
import PrivateRoute from "./Components/PublicRoute";
import Usuarios from "./Components/admin/Usuarios";
import Registros from "./Components/admin/Registros";


export const routes =  createBrowserRouter([
   {
      path: "/",
      element: <App />,
   },
   {
      path: "/login",
      element: <Login />,
   },
   {
      path: "/register",
      element: <Register />,
   },
   {
      path: "/admin",
      element: <Admin />,
   },
   {
      path: "/admin",
      element: <AdminTemplate />,
      children: [
         {
            path: "dashboard",
            element: <Dashboard />,
            index: true,
         },
         {
            path: "usuarios",
            element: <Usuarios />,
         },
         {
            path: "registros",
            element: <Registros />,
         },
         {
            element: <>404</>,
            path: "*",
         },
      ],
   },
   {
      element: <PrivateRoute />,
      children: [
         {
            path: "/form",
            element: <Form />,
         },
         {
            path: "/sport-info",
            element: <SportHistory />,
         },
      ]
   },
      
])