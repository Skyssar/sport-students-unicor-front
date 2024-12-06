import { LoginOutlined } from "@mui/icons-material";
import { Alert, Box, Button, TextField } from "@mui/material"
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
// import useAuth from "src/hooks/useAuth";
import Logo from "src/assets/img/unicor_acreditada.png"
import Bg from "src/assets/img/OIG2.jpg"

function Admin() {

   const { control, handleSubmit } = useForm({
      defaultValues: {
         username: '',
         password: '',
      }
   });

   const navigate = useNavigate();

   // const { loginUser, loginGoogleUser, error } = useAuth();

   const onSubmit = handleSubmit( data => {
      navigate("/admin/dashboard")
   });

   return (
      <div className="login-container" style={{ backgroundColor: "gray", backgroundSize: "cover", backgroundPosition: "center" }}>
         <form className="login-form" onSubmit={ onSubmit }>
            <div className="form-header">
               <div className="form-logo">
                  <img src={Logo} alt="SGC Logo" />
               </div>
               <h2>Admin Sports Students</h2>
            </div>
            <div className="form-content">
               {/* {
                  error && (
                     <Alert severity="error"> 
                        Credenciales inválidas
                     </Alert>
                  )
               } */}
               <Controller 
                  name="username"
                  rules={{ required: true }}
                  control={control}
                  render={({ field }) => (
                     <TextField 
                        label="Usuario"
                        fullWidth size="small" margin="normal"
                        required
                        {...field}
                     />
                  )}
               />
               <Controller 
                  name="password"
                  rules={{ required: true }}
                  control={control}
                  render={({ field }) => (
                     <TextField 
                        label="Contraseña" type="password"
                        fullWidth size="small" margin="normal"
                        required
                        {...field}
                     />
                  )}
               />
               <div className="form-buttons">
                  <Button type="submit" className="sgc-button" fullWidth variant="contained">
                     <LoginOutlined fontSize="small" />
                     &nbsp;Iniciar Sesión
                  </Button>
               </div>
               <Box textAlign="center" mt={3}>
                  <p style={{ fontSize: 14 }}>Esta vista es sólo para administradores. Si quieres iniciar sesión con tu cuenta, haz click <Link to="/login">aquí</Link>.</p>
               </Box>
            </div>
         </form>
      </div>
   )
}
export default Admin