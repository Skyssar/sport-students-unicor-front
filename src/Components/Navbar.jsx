import { Box } from "@mui/material"
import Logo from "src/assets/img/unicor_acreditada.png"

function Navbar({ children }) {
   return (
      <div>
         <Box display="flex" gap={2} py={2} px={5} width="100%" alignItems="center" borderBottom="1px solid gray">
            <img src={Logo} alt="Logo" height={50} />
            <h2 style={{ color: "#247424" }}>Sport Students Universidad de Córdoba</h2>
         </Box>
         <Box p={5} bgcolor="#f3fff5">
            {children}
         </Box>
      </div>
   )
}
export default Navbar