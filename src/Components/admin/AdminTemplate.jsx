import { Suspense } from "react"

import { Logout, Person } from "@mui/icons-material"
import { Link, Outlet, useNavigate } from "react-router-dom"
import { IconButton } from "@mui/material"
// import useAuth from "src/hooks/useAuth"
import Logo from "src/assets/img/unicor_acreditada.png"
import NavBar from "./NavBar"

function Topbar() {

   const navigate = useNavigate();

   return (
      <div className="content-topbar">
         <Link to="/admin/dashboard">
            <img src={ Logo } alt="Logo" height={35} />
         </Link>
         <div>
            {/* <ThemeButton /> */}
            <IconButton title="Usuario" LinkComponent={ Link } to="/user" >
               <Person />
            </IconButton>
            <IconButton title="Cerrar Sesión" onClick={ () => navigate("/") } >
               <Logout />
            </IconButton>
         </div>
      </div>
   )
}

function AdminTemplate() {
   return (
      <div className="admin-container">
         <div className="navbar">
            <NavBar />
         </div>
         <div className="content">
            <Topbar />
            <div className="content-container">
               <Suspense fallback={ <>Loading...</> }>
                  <Outlet />
               </Suspense>
            </div>
         </div>
      </div>
  )   
}
export default AdminTemplate