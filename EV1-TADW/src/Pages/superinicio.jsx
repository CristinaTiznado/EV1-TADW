import React from "react"
import {
    Button,
    Grid,
    Typography,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material"

import { useEffect, useState } from "react"

import axios from "axios";


export default function Inicio() {
   const [perros, setPerros] = useState([]);

    const [openDialog, setOpenDialog] = useState(true);

    // Función para cerrar el diálogo
    const handleCloseDialog = () => {
      setOpenDialog(false);
    };
  
    // Función para manejar las acciones cuando se hacen clic en los botones del diálogo
    const handleDialogButtonClick = (action) => {
      if (action === "button1") {
        // Acción para el Botón 1
      } else if (action === "button2") {
        // Acción para el Botón 2
      }
      setOpenDialog(false); // Cerrar el diálogo después de manejar la acción
    };


const obtenerFotoUnica = async () => {
    setIsLoading(true);
    setLoadingMessage("CARGANDO FOTITO...");

    let fotoUnica = null;

    while (fotoUnica === null) {
        const response = await fetch('https://dog.ceo/api/breeds/image/random');

        try {
            const info = await response.json();
            const fotoExistente = perros.some(perro => perro.url_foto === info.message);

            if (!fotoExistente) {
                setFoto({
                    imagen: info.message
                });
                fotoUnica = info.message;
                console.log("PASO LA FOTO AAAA")
            }
        } catch (error) {
            console.error("Error al obtener la foto:", error);
        }
    }

    setIsLoading(false);
    setLoadingMessage("");
};

    useEffect(() => {
        obtenerFotoUnica()
    }, [])

    useEffect(() => {
        axios.get('http://localhost:8000/api/perros/todos')
          .then(response => {
            {console.log("ANTES DE LLAMAR A LOS PERROS")}
            {console.log(response.status)}
            setPerros(response.data);
            {"SE SUPONE YA SE SETEARON"}
          })
          .catch(error => {
            console.error('Error al obtener perros:', error);
          });
      }, []);

    return (
        <>

{/* Diálogo para mostrar dos botones */}
<Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Selecciona una opción</DialogTitle>
        <DialogContent>
          <DialogContentText>
            DIME QUE QUIERES HACER PARA COMENZAR:
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleDialogButtonClick("REGISTRAR PERRO")} color="primary">
          REGISTRAR PERRO
          </Button>
          <Button onClick={() => handleDialogButtonClick("ELEGIR PERFIL PARA VER CANDIDATOS")} color="primary">
          ELEGIR PERFIL PARA VER CANDIDATOS
          </Button>
        </DialogActions>
      </Dialog>


            <Grid container spacing={2} direction="row" justifyContent="center">
                <Grid item md={4} sm={12}>
                    <Typography color={"black"} variant="h5" align="center">
                        T I N D E R
                    </Typography>






{/*ESTA ES LA PARTE QUE MUESTRA EL PERRO Y LOS BOTONES*/}





                </Grid>

            </Grid>

        </>
    )
}