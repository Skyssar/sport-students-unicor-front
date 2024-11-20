import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Box } from '@mui/material';

const VisuallyHiddenInput = styled('input')({
   clip: 'rect(0 0 0 0)',
   clipPath: 'inset(50%)',
   height: 1,
   overflow: 'hidden',
   position: 'absolute',
   bottom: 0,
   left: 0,
   whiteSpace: 'nowrap',
   width: 1,
});

export default function InputFile() {

   const fileName = React.useRef();

   const handleUpload = (e) =>{
      if ( e.target.files.length > 0 ){
         fileName.current.innerHTML = e.target.files[0].name;
      } else {
         fileName.current.innerHTML = ""
      }
   }

   return (
      <div>      
         <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
            sx={{ mt: 2, mb:1 }}
         >
            Subir archivo
            <VisuallyHiddenInput
               type="file"
               accept="application/pdf"
               onChange={handleUpload}
               multiple={false}
            />
            
         </Button>
         <p ref={ fileName }></p>
      </div>
   );
}