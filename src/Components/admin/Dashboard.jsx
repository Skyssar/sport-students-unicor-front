import { ArrowCircleRightRounded, DocumentScanner, People, Sports, Volcano, Widgets } from "@mui/icons-material"
import Grid from "@mui/material/Grid2"
import { Link } from "react-router-dom"

const homeProducts = [
   {
      id: 0,
      title: "Usuarios",
      icon: People,
      link: "/admin/usuarios"
   },
   {
      id: 1,
      title: "Registros deportistas",
      icon: DocumentScanner,
      link: "/admin/registros"
   },
   {
      id: 2,
      title: "Deportes",
      icon: Sports,
      link: "/admin/deportes"
   },
]

function Dashboard() {
   return (
      <Grid container spacing={2} padding={2} >
         {
            homeProducts.map( product => (
               <Grid key={product.id} size={{ xs: 12, sm: 6, md: 4, xl: 3 }}>
                  <Link to={ product.link } className="admin-card">
                     <div className="card-content">
                        <h3>{ product.title }</h3>
                        { <product.icon className="card-icon" /> }
                     </div>
                     <div className="card-footer">
                        Ver&nbsp; <ArrowCircleRightRounded fontSize="small" /> 
                     </div>
                  </Link>
               </Grid>
            ) )
         }
      </Grid>

   )
}
export default Dashboard