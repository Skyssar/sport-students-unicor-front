import { Controller, useForm } from "react-hook-form";
import { Paper, Typography, Box, Grid2 as Grid, TextField, MenuItem, Button } from "@mui/material";
import Navbar from "./Navbar";
import { DateField } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";

const inputs = [
   {
      name: "name",
      label: "Nombres",
      type: "text",
   },
   {
      name: "lastName",
      label: "Apellidos",
   },
   {
      name: "typeId",
      label: "Tipo de identificación",
      select: true,
      options: [
         { id: "CC", label: "Cédula de ciudadanía" },
         { id: "TI", label: "Tarjeta de identidad" },
         { id: "CE", label: "Cédula de extranjería" },
         { id: "PS", label: "Pasaporte" },
      ]
   },
   {
      name: "id_number",
      label: "Número de identificación",
      type: "number",
   },
   {
      name: "birthday",
      label: "Fecha de nacimiento",
      type: "date",
   },
   {
      name: "gender",
      label: "Género",
      select: true,
      options: [
         { id: "F", label: "Femenino" },
         { id: "M", label: "Masculino" },
         { id: "O", label: "Otro" },
      ]
   },
   {
      name: "country",
      label: "País",
   },
   {
      name: "region",
      label: "Departamento o provincia",
      required: false,
   },
   {
      name: "city",
      label: "Ciudad",
   },
   {
      name: "address",
      label: "Dirección",
   },
   // {
   //    name: "email",
   //    label: "Correo electrónico",
   //    type: "email",
   //    disabled: true,
   // },
   // {
   //    name: "phone",
   //    label: "Celular",
   //    type: "tel"
   // },
]

const valuesFromArray = ( object=null ) => {
   return { 
      ...inputs.reduce((a, v) => ({ ...a, [v.name]: !object ? "" : object[v.name]}), {}), 
   }
}

function Form() {

   const { control, handleSubmit, formState } = useForm({
      defaultValues: valuesFromArray(),
      mode: "onChange",
   });

   const [ dateError, setDateError ] = useState(null);
   const dateRef = useRef();

   const onSubmit = handleSubmit(async (info) => {
      let userFromStorage = localStorage.getItem("user");
      info["birthday"] = dayjs(dateRef.current?.value).format('YYYY-MM-DD');
      delete info.email;
      info["user"] = JSON.parse( userFromStorage ).id;
      try {
         const { data } = await axios.post('http://localhost:8000/api/profile-info/', info)
         if (data){
            navigate("/sport-info");
         }
      } catch (e){
         console.log(e);
      }
   })

   useEffect( () => {
      console.log(formState)
      // console.log(errors)
   }, [ formState ] )

   const navigate = useNavigate();

   return (
      <Navbar>
         <Paper component="form" onSubmit={ onSubmit } sx={{ p: 4 }}>
            <h2>
               Información del estudiante
            </h2>
            <small>Por favor, llene la siguiente información. Los campos marcados con * son requeridos.</small>
            <Box mt={4} mb={2}>
               <Grid container spacing={3}>
                  {
                     inputs.map((input, i) => (
                        <Grid key={`${input.name}-${i}`} size={{ xs: 12, sm:6 }}>
                           {
                              input.type !== "date" ? (
                              <Controller
                              name={ input.name }
                              rules={{ required: input.required === false ? false : true}}
                              control={control}
                              render={({ field }) => (
                                 
                                    <TextField
                                       required={input.required === false ? false : true}
                                       type={ input.type ?? "text" }
                                       label={ input.label }
                                       select={ input.select ?? false }
                                       fullWidth variant="outlined"
                                       // helperText={ handleErrorsMessage( input.name, input.range ) }
                                       error={ formState.errors.hasOwnProperty( input.name ) }
                                       {
                                          ...input.select && {
                                             children: input.options?.map(
                                                (option) => (
                                                   <MenuItem key={option.id} value={option.id}>
                                                   {option.label}
                                                   </MenuItem>
                                                )
                                             )
                                          }
                                       }
                                       {...field}
                                    />
                                 )} 
                              />
                              ) : (
                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                 <DateField inputRef={dateRef} fullWidth required onError={(e) => setDateError(e)} format="DD/MM/YYYY" label={ input.label } />
                              </LocalizationProvider>
                              )
                           }

                        </Grid>
                     ))
                  }
               </Grid>
               <Box display="flex" mt={4} gap={1} justifyContent="flex-end">
                  <Button type="submit" disabled={ !formState.isValid || dateError != null } variant="contained" color="primary">
                     Siguiente
                  </Button>
               </Box>
            </Box>     
         </Paper>
      </Navbar>
   )
}
export default Form