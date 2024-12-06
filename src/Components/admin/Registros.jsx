import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { IconButton } from '@mui/material';
import { Visibility } from '@mui/icons-material';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function Registros() {

   const [ sportInfo, setSportInfo ] = React.useState([]);
   const [ profileInfo, setProfileInfo ] = React.useState([]);

   const fetchUsuarios = async() => {
      try {
         const [ sportData, profileData ] = await Promise.all([
            axios.get('http://localhost:8000/api/sport-info'),
            axios.get('http://localhost:8000/api/users/'),
         ])
         if (sportData && profileData){
            console.log(profileData)
            setSportInfo( sportData.data )
            setProfileInfo(profileData.data)
         }
      } catch (e){
         console.log(e);
      }
   }

   React.useEffect(()=>{
      fetchUsuarios();
   }, [])
   

  return (
    <TableContainer component={Paper}>
      <h1 style={{ margin: 25 }}>Registros</h1>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell align="center">Usuario</TableCell>
            <TableCell align="center">Anamnesis</TableCell>
            <TableCell align="center">Consentimiento informado</TableCell>
            <TableCell align="center">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
         {
             sportInfo?.map((row, index) => (
                 <TableRow
                   key={row.id}
                   sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                 >
                   <TableCell component="th" scope="row">
                     {row.id}
                   </TableCell>
                   <TableCell align="center">{ profileInfo[index]?.name + " " +  profileInfo[index]?.lastName }</TableCell>
                   <TableCell align="center"><a href={ row.anamnesis_file } download>Ver anamnesis</a></TableCell>
                   <TableCell align="center"><a href={ row.ci_file } download>Ver Consentimiento</a></TableCell>
                   <TableCell align='center'><IconButton title='Ver completo'> <Visibility /> </IconButton></TableCell>
                 </TableRow>
               ))
         }
            
         
        </TableBody>
      </Table>
    </TableContainer>
  );
}