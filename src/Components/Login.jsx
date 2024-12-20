import { LoginOutlined } from "@mui/icons-material";
import { Alert, Box, Button, TextField } from "@mui/material"
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
// import useAuth from "src/hooks/useAuth";
import Logo from "src/assets/img/unicor_acreditada.png"
import Bg from "src/assets/img/OIG2.jpg"
import axios from "axios";
import { useState } from "react";

function Login() {

   const { control, handleSubmit } = useForm({
      defaultValues: {
         email: '',
         password: '',
      }
   });

   const [ error, setError ] = useState(false);

   const navigate = useNavigate();

   const onSubmit = handleSubmit( async (userData) => {
      try {
         const { data } = await axios.post('http://localhost:8000/api/login', userData)
         if (data){
            setError(false);
            window.localStorage.setItem( "user", JSON.stringify( data.user ) )
            navigate("/form");
         }
      } catch (e){
         console.log(e);
         setError(true);
      }
       
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
               {
                  error && (
                     <Alert severity="error"> 
                        Credenciales inválidas
                     </Alert>
                  )
               }
               <Controller 
                  name="email"
                  rules={{ required: true }}
                  control={control}
                  render={({ field }) => (
                     <TextField 
                        label="Correo" type="email"
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
                  <p style={{ fontSize: 14 }}>¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link></p>
               </Box>
            </div>
         </form>
      </div>
   )
}
export default Login