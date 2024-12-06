import {  Ballot, Description, Email, Home, List, MenuOpen, MenuOutlined, People, Sports, TrackChanges, Volcano, Widgets } from "@mui/icons-material"
import { useMediaQuery } from "@mui/material"
import { useEffect, useState } from "react"
import { Menu, MenuItem, Sidebar, SubMenu } from "react-pro-sidebar"
import { NavLink, useLocation } from "react-router-dom"

function NavBar() {

   const mobile = useMediaQuery('(max-width:900px)');
   const [ expanded, setExpanded ] = useState(false);

   const location = useLocation();

   useEffect(() => {
      if ( mobile ) setExpanded( false ); 
   },[ mobile ])

   useEffect(() => {
      if ( mobile && expanded ) setExpanded( false ); 
   },[ location ])

   return (
      <Sidebar 
         className="admin-sidebar"
         collapsed={ !expanded } 
         collapsedWidth="65px"
      >
         <Menu
            closeOnClick
            className="sidebar-menu"
         >
            <MenuItem className="sidebar-header" onClick={() => setExpanded(!expanded)} icon={ expanded ? <MenuOpen /> : <MenuOutlined/> }>
               <h1>Admin SAE v2</h1>
            </MenuItem>
            <MenuItem icon={ <Home /> } component={<NavLink to="/admin/dashboard" />}>Dashboard</MenuItem>
            <MenuItem  icon={ <People /> }  component={<NavLink to="/admin/usuarios" />} >
               Usuarios
            </MenuItem>
            <MenuItem icon={ <Sports /> }  component={<NavLink to="/admin/deportes" />}>
               Deportes
            </MenuItem>
         </Menu>
      </Sidebar>
   )
}
export default NavBar