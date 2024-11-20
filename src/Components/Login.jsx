import { LoginOutlined } from "@mui/icons-material";
import { Alert, Button, TextField } from "@mui/material"
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
// import useAuth from "src/hooks/useAuth";
import Logo from "src/assets/img/unicor_acreditada.png"
import Bg from "src/assets/img/OIG2.jpg"

function Login() {

   const { control, handleSubmit } = useForm({
      defaultValues: {
         username: '',
         password: '',
      }
   });

   const navigate = useNavigate();

   // const { loginUser, loginGoogleUser, error } = useAuth();

   const onSubmit = handleSubmit( data => {
      navigate("/form")
   });

   return (
      <div className="login-container" style={{ backgroundImage: `url(${ Bg })`, backgroundSize: "cover", backgroundPosition: "center" }}>
         <form className="login-form" onSubmit={ onSubmit }>
            <div className="form-header">
               <div className="form-logo">
                  <img src={Logo} alt="SGC Logo" />
               </div>
               <h2>Sport Students Unicor</h2>
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
            </div>
         </form>
      </div>
   )
}
export default Login