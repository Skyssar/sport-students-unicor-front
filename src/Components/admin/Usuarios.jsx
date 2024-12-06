import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';

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

export default function Usuarios() {

   const [ users, setUsers ] = React.useState([]);

   const fetchUsuarios = async() => {
      try {
         const { data } = await axios.get('http://localhost:8000/api/users')
         if (data){
            setUsers( data )
         }
      } catch (e){
         console.log(e);
      }
   }

   React.useEffect(()=>{
      fetchUsuarios();
   }, [])
   
   console.log(users);
  return (
    <TableContainer component={Paper}>
      <h1 style={{ margin: 25 }}>Usuarios</h1>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="center">Correo</TableCell>
            <TableCell align="center">Nombres</TableCell>
            <TableCell align="center">Apellidos</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users?.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="center">{row.email}</TableCell>
              <TableCell align="center">{row.name}</TableCell>
              <TableCell align="center">{row.lastName}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}