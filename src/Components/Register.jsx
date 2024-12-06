import { LoginOutlined, People } from "@mui/icons-material";
import { Alert, Box, Button, Grid2 as Grid, TextField } from "@mui/material"
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
// import useAuth from "src/hooks/useAuth";
import Logo from "src/assets/img/unicor_acreditada.png"
import Bg from "src/assets/img/OIG2.jpg"
import axios from "axios";
import { useState } from "react";

function Register() {

   const { control, handleSubmit, formState: { errors, isValid } } = useForm({
      defaultValues: {
         name: '',
         lastname: '',
         email: '',
         password: '',
      }
   });


   const [ error, setError ] = useState("");
   const navigate = useNavigate();

   // const { loginUser, loginGoogleUser, error } = useAuth();

   const onSubmit = handleSubmit(async (userData) => {
      try {
         console.log(userData)
         const { data } = await axios.post('http://localhost:8000/api/signup', userData)
         if (data){
            setError("");
            navigate("/login");
         }
      } catch (e){
         console.log(e);
         e.response.data && setError( Object.values(e.response.data)[0] );
      }
      // navigate("/form")
   });


   return (
      <div className="login-container" style={{ backgroundImage: `url(${Bg})`, backgroundSize: "cover", backgroundPosition: "center" }}>
         <form className="login-form" style={{ width: 800 }} onSubmit={onSubmit}>
            <div className="form-header">
               <div className="form-logo">
                  <img src={Logo} alt="SGC Logo" />
               </div>
               <h2>Registrar Usuario</h2>
            </div>
            <div className="form-content">
               {
                  error != "" && (
                     <Alert severity="error" onClose={ () => setError("") }>
                        { error }
                     </Alert>
                  )
               }
               <Grid container spacing={2}>
                  <Grid size={{ xs: 12, md: 6 }}>
                     <Controller
                        name="name"
                        rules={{ required: true }}
                        control={control}
                        render={({ field }) => (
                           <TextField
                              label="Nombre"
                              fullWidth size="small" margin="normal"
                              required
                              {...field}
                           />
                        )}
                     />
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

                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                     <Controller
                        name="lastname"
                        rules={{ required: true }}
                        control={control}
                        render={({ field }) => (
                           <TextField
                              label="Apellidos"
                              fullWidth size="small" margin="normal"
                              required
                              {...field}
                           />
                        )}
                     />
                     <Controller
                        name="password"
                        rules={{ required: true, minLength: 8}}
                        control={control}
                        render={({ field }) => (
                           <TextField
                              label="Contraseña" type="password"
                              fullWidth size="small" margin="normal"
                              required slotProps={{ htmlInput: { minLength: 8}}}
                              {...field}
                           />
                        )}
                     />
                  </Grid>
               </Grid>
               {/* {
               error && (
                  <Alert severity="error"> 
                     Credenciales inválidas
                  </Alert>
               )
            } */}

               <Box display="flex" justifyContent="center" mt={4}>
                  <Button type="submit" sx={{ maxWidth: 300 }} className="sgc-button" fullWidth variant="contained">
                     <People fontSize="small" />
                     &nbsp;Registrarse
                  </Button>
               </Box>
               <Box textAlign="center" mt={3}>
                  <p style={{ fontSize: 14 }}>Si ya tienes cuenta, <Link to="/login">inicia sesión aquí</Link></p>
               </Box>
            </div>
         </form>
      </div>
   )
}
export default Register