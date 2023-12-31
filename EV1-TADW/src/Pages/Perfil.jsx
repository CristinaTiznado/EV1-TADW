import React from "react"
import {
    Button,
    Card,
    CardActions,
    CardContent,
    Divider,
    Grid,
    LinearProgress,
    Typography,
    TextField,
    List,
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material"

import { useEffect, useState } from "react"
import DogCard from "../Components/DogCard"
import { loremIpsum } from 'lorem-ipsum'
import { styled } from '@mui/material/styles';
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import FotoCard from "../Components/FotoCard"


import Swal from 'sweetalert2';
import axios from "axios";


const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function Inicio() {
    const [expandedIndexAceptados, setExpandedIndexAceptados] = useState(null)
    const [expandedIndexRechazados, setExpandedIndexRechazados] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [LoadingMessage, setLoadingMessage] = useState("")

    const [foto, setFoto] = useState({imagen: ''})

    const [perros, setPerros] = useState([]);

    const [perroInteresado, setPerroInteresado] = useState(null);


    const [openDialog, setOpenDialog] = useState(true);

    const handle2 = (perro) => {
        setPerroInteresado(perro);
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
        <Typography color={"black"} variant="h4" align="center">
                T I N D E R
              </Typography><br></br>
          <Grid container spacing={2} direction="row">
            {/* Primera Columna - Lista de Perros */}
            
            <Grid item md={4} sm={12} sx={{ overflowY: "auto", maxHeight: "calc(100vh - 64px)" }}>
            <Typography color={"black"} variant="h5" align="center">
                L I S T A   D E   P E R R O S
            </Typography><br></br>
              {isLoading && <LinearProgress />}
              {LoadingMessage && <p>{LoadingMessage}</p>}
    
              <List>
                {perros.map((perro, index) => (
                  <ListItem key={index}>
                    <ListItemAvatar>
                      <Avatar alt={perro.nombre} src={perro.url_foto} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={perro.nombre}
                      secondary={perro.descripcion}
                      onClick={() => handle2(perro)}
                    />
                  </ListItem>
                ))}
              </List>
            </Grid>
    
            {/* Segunda Columna - Información del Perro Interesado */}
            <Grid item md={8} sm={12}>
            <Typography color={"black"} variant="h5" align="center">
                D E T A L L E
            </Typography><br></br>
              {perroInteresado && (

                <Card>
                    <DogCard props={perroInteresado} tipo="principal" />
                  <Button
                    variant="contained"
                    onClick={() => history.push(`/aceptados-rechazados/${perroInteresado.id}`)}
                    disabled={isLoading}
                  >
                    Ver Detalles
                  </Button>
                </Card>
              )}
            </Grid>
          </Grid>
        </>
      );
    }