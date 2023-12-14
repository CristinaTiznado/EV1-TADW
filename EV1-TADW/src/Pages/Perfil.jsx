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
    const [dog, setDog] = useState({ nombre: '', imagen: '', descripcion: '' })
    const [ListaAceptados, setListaAceptados] = useState([])
    const [ListaRechazados, setListaRechazados] = useState([])
    const [expandedIndexAceptados, setExpandedIndexAceptados] = useState(null)
    const [expandedIndexRechazados, setExpandedIndexRechazados] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [LoadingMessage, setLoadingMessage] = useState("")

    const [foto, setFoto] = useState({imagen: ''})
    const [nombre, setNombre] = useState({nombre: ''})
    const [descripcion, setdescripcion] = useState({descripcion: ''})
    const [perroSeleccionado, setPerroSeleccionado] = useState(null);

    const [perros, setPerros] = useState([]);

    const [perroInteresado, setPerroInteresado] = useState(null);


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


    const handleNombreClick = (perro) => {
        setPerroSeleccionado(perro);
    };

    const handle2 = (perro) => {
        setPerroInteresado(perro);
    };


    const handleExpandClickAceptados = (index) => {
        if (expandedIndexAceptados === index) {
            setExpandedIndexAceptados(null);
        } else {
            setExpandedIndexAceptados(index);
            setExpandedIndexRechazados(null)
        }
    };

    const handleExpandClickRechazados = (index) => {
        if (expandedIndexRechazados === index) {
            setExpandedIndexRechazados(null);
        } else {
            setExpandedIndexRechazados(index);
            setExpandedIndexAceptados(null)
        }
    };

/*TAREA 3*/



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

const RegistrarPerro2 = async (nombre, descripcion) => {

    console.log("FOTO: ", foto)
    console.log("nombre: ", nombre)
    console.log("descripcion: ", descripcion)

    try {
    const response = await axios.post(
        "http://localhost:8000/api/perros",
        {
        nombre: nombre,
        url_foto: foto,
        descripcion: descripcion,
        },
        { withCredentials: false }
        );

        if (response.status === 200) {
            console.log("Perro registrado exitosamente");
        } else {
            console.error("Error al registrar el perro");
        }
        } catch (error) {
        console.error("Error en la solicitudAAAAA:", error);
        }
    };

{/*ESTA ES LA PARTE QUE MUESTRA LOS PERROS CREADOS*/}
const ListaPerros = () => {
    return (

    <List>
        {perros.map((perro, index) => (
            <ListItem key={index}>
                <ListItemAvatar>
                <Avatar alt={perro.nombre} src={perro.url_foto} />
            </ListItemAvatar>
            <ListItemText primary={perro.nombre} secondary={perro.descripcion} onClick={() => handle2(perro)}/>
        </ListItem>
        ))}
    </List>
    );
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



            <Grid container spacing={2} direction="row">
                <Grid item md={4} sm={12}>
                    <Typography color={"black"} variant="h5" align="center">
                        T I N D E R
                    </Typography>
                    {isLoading && <LinearProgress />}
                    {LoadingMessage && <p>{LoadingMessage}</p>}


{/*ESTA ES LA PARTE QUE MUESTRA EL PERRO Y LOS BOTONES*/}

<Grid item md={4} sm={12}>
    <Typography color={"black"} variant="h5" align="center">
        L I S T A   D E   P E R R O S
    </Typography>
    <ListaPerros perros={perros} />
</Grid>


{perroInteresado && (
    <Card>
        <DogCard props={perroInteresado} tipo="principal" />
        <CardActions>
        <Button variant="contained" >
            ELEGIR PERRO
        </Button>
    </CardActions>
    </Card>
)}

{/** 
<Button
    variant="contained"
    onClick={() => history.push(`/aceptados-rechazados/${perroInteresado.id}`)}
    disabled={isLoading}
>
</Button>
*/}


                </Grid>

            </Grid>

        </>
    )
}