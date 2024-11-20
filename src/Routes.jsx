import { createBrowserRouter } from "react-router-dom";
import Login from "./Components/Login";
import App from "./App";
import Form from "./Components/Form";
import SportHistory from "./Components/SportHistory";


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
      path: "/form",
      element: <Form />,
   },
   {
      path: "/sport-info",
      element: <SportHistory />,
   },
      
])