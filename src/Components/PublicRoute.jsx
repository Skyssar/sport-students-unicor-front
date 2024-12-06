import { Navigate, Outlet } from "react-router-dom";

function PrivateRoute() {

   let userFromStorage =  localStorage.getItem("user");

   if ( !userFromStorage ){
      return <Navigate to="/login" />
   }
   return <Outlet />;
}
export default PrivateRoute