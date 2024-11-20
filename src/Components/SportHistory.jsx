import { TextField, Autocomplete, Grid2 as Grid, Paper, Button, Chip, Stack, createFilterOptions, FormControl, FormControlLabel, RadioGroup, Radio, MenuItem, CssBaseline } from "@mui/material";
import Navbar from "./Navbar";
import { useState } from "react";
import InputFile from "./UI/InputFile";

const deportes = [
   "fútbol", "baloncesto", "tenis", "natación", "atletismo", "béisbol", "rugby",
   "golf", "voleibol", "boxeo", "hockey", "ciclismo", "esgrima", "esquí",
   "karate", "judo", "taekwondo", "motocross", "fórmula 1", "bádminton",
   "ping pong", "snowboard", "luge", "escalada", "wrestling", "surf", "handbol",
   "polo", "canotaje", "waterpolo", "esquí acuático", "patinaje artístico",
   "tejo", "salto triple", "ciclomontañismo", "patinaje sobre ruedas", "bolos",
   "arquería", "póker", "dardos", "balonmano", "futsal", "kitesurf", "parapente",
   "fútbol sala", "paddleboarding", "críquet", "lacrosse", "carrera de caballos",
   "gimnasia", "windsurf", "sóftbol", "aeróbicos", "kickboxing"
]

const intercolegiadosOptions = [
   "Fase municipal", "Fase departamental", "Fase nacional", "Fase internacional"
]

const asociadoOptions = [
   "Interclubes", "Interligas", "Campeonatos regionales", "Campeonatos departamentales", "Campeonato nacional", "Selección nacional", "Participaciones internacionales"
]

const capitalize = function (string) {
   return string.charAt(0).toUpperCase() + string.slice(1);
}

const filter = createFilterOptions();

function SportHistory() {

   const [selectedSports, setSelectedSports] = useState([]);
   const [selectValue, setSelectValue] = useState(null);
   const [years, setYears] = useState(0);

   const [options, setOptions] = useState({
      intercolegiados: 0,
      campeonatos: 0,
      reconocimientos: 0
   })

   const handleSubmitSport = (e) => {
      e.preventDefault();
      console.log(selectValue)
      setSelectedSports(prev => [...prev, { sport: selectValue.title, years: years }]);
      setSelectValue(null);
   }

   const deleteSelectedSport = (index) => {
      setSelectedSports(prev => {
         let arr = [...prev];
         arr.splice(index, 1);
         return arr;
      })
   }

   return (
      <Navbar>
         <Paper sx={{ p: 4 }}>
            <h2 style={{ marginBottom: 12 }}>Historia Deportiva</h2>
            <Grid component="form" onSubmit={handleSubmitSport} container spacing={3} mb={3}>
               <Grid size={{ xs: 12 }}>
                  <h3>¿Qué deportes practica o ha practicado?</h3>
               </Grid>
               <Grid size={{ xs: 12, sm: 6 }}>
                  <Autocomplete
                     fullWidth
                     freeSolo
                     clearOnBlur
                     options={deportes}
                     value={selectValue}
                     onChange={(event, newValue) => {
                        console.log(newValue)
                        if (typeof newValue === 'string') {
                           setSelectValue({
                              title: newValue,
                           });
                        } else if (newValue && newValue.inputValue) {
                           // Create a new value from the user input
                           setSelectValue({
                              title: newValue.inputValue,
                           });
                        } else {
                           setSelectValue(newValue);
                        }
                     }}
                     filterOptions={(options, params) => {
                        const filtered = filter(options, params);

                        const { inputValue } = params;
                        // Suggest the creation of a new value
                        const isExisting = options.some((option) => inputValue === option.title);
                        if (inputValue !== '' && !isExisting) {
                           filtered.push({
                              inputValue,
                              title: `Add "${inputValue}"`,
                           });
                        }

                        return filtered;
                     }}
                     getOptionLabel={(option) => {
                        // Value selected with enter, right from the input
                        if (typeof option === 'string') {
                           return capitalize(option);
                        }
                        // Add "xxx" option created dynamically
                        if (option.inputValue) {
                           return option.inputValue;
                        }
                        // Regular option
                        return capitalize(option.title);
                     }}
                     renderInput={(params) => (
                        <TextField
                           {...params}
                           required
                           variant="outlined"
                           label="Deportes"
                           placeholder="Deportes que practica o ha practicado"
                        />
                     )}
                  />
               </Grid>
               <Grid size={{ xs: 6, sm: 3 }}>
                  <TextField
                     type="number"
                     label="Número de años"
                     fullWidth variant="outlined"
                     value={years}
                     onChange={(e) => setYears(e.target.value)}
                  />
               </Grid>
               <Grid display="flex" alignItems="center" size={{ xs: 6, sm: 3 }}>
                  <Button type="submit" variant="contained">
                     Agregar
                  </Button>
               </Grid>
               <Grid size={{ xs: 12 }}>
                  <Stack direction="row" spacing={2}>
                     {
                        selectedSports.length > 0 && (
                           selectedSports.map((v, i) => (
                              <Chip
                                 label={`${capitalize(v.sport)} (${v.years} años)`}
                                 onDelete={() => deleteSelectedSport(i)}
                              />
                           ))
                        )
                     }
                  </Stack>
               </Grid>
            </Grid>

            <Grid container spacing={4}>
               <Grid container size={{ xs: 12, md: 6 }} spacing={2}>
                  <Grid size={{ xs: 12 }}>
                     <h3>¿Ha participado en juegos intercolegiados?</h3>
                  </Grid>
                  <Grid display="flex" alignItems="center">
                     <FormControl>
                        <RadioGroup
                           sx={{ display: "flex", flexDirection: "row" }}
                           value={options.intercolegiados}
                           onChange={(e, value) => {
                              setOptions(prev => ({ ...prev, intercolegiados: value }))
                           }}
                        >
                           <FormControlLabel value={1} control={<Radio />} label="Sí" />
                           <FormControlLabel value={0} control={<Radio />} label="No" />
                        </RadioGroup>
                     </FormControl>
                  </Grid>
                  {
                     options.intercolegiados != 0 && (
                        <Grid size={{ xs: "grow" }}>
                           <TextField select fullWidth size="medium" label="Fase alcanzada">
                              {
                                 intercolegiadosOptions.map((option, i) => (
                                    <MenuItem key={`${option}-${i}`} value={option}>
                                       {option}
                                    </MenuItem>
                                 ))
                              }

                           </TextField>
                        </Grid>
                     )
                  }
               </Grid>

               <Grid container size={{ xs: 12, md: 6 }} spacing={2}>
                  <Grid size={{ xs: 12 }}>
                     <h3>¿Ha participado en fases de deporte asociado?</h3>
                  </Grid>
                  <Grid display="flex" alignItems="center">
                     <FormControl>
                        <RadioGroup
                           sx={{ display: "flex", flexDirection: "row" }}
                           value={options.campeonatos}
                           onChange={(e, value) => {
                              setOptions(prev => ({ ...prev, campeonatos: value }))
                           }}
                        >
                           <FormControlLabel value={1} control={<Radio />} label="Sí" />
                           <FormControlLabel value={0} control={<Radio />} label="No" />
                        </RadioGroup>
                     </FormControl>
                  </Grid>
                  {
                     options.campeonatos != 0 && (
                        <Grid size={{ xs: "grow" }}>
                           <TextField select fullWidth size="medium" label="Nivel alcanzado">
                              {
                                 asociadoOptions.map((option, i) => (
                                    <MenuItem key={`${option}-${i}`} value={option}>
                                       {option}
                                    </MenuItem>
                                 ))
                              }

                           </TextField>
                        </Grid>
                     )
                  }
               </Grid>

               <Grid size={{ xs: 12 }}>
                  <h3>Reconocimientos al mérito deportivo</h3>
                  <p><small>Cargar en un sólo archivo PDF.</small></p>
                  <InputFile />
               </Grid>

               <hr style={{ width: "100%" }} />

               <Grid size={{ xs: 12, md: 6 }}>
                  <h3>Anamnesis Deportiva</h3>
                  <p><small>Original del certificado médico de aptitud para el ejercicio físico en PDF.</small></p>
                  <InputFile />
               </Grid>

               <Grid size={{ xs: 12, md: 6 }}>
                  <h3>Consentimiento informado</h3>
                  <p><small>Original, firmado por el participante o representante legal (en caso de ser menor de edad).</small></p>
                  <InputFile />
               </Grid>

            </Grid>

         </Paper>

      </Navbar>
   );
}
export default SportHistory