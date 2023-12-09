import React from "react"
import {
    Button,
    Card,
    CardActions,
    CardContent,
    Divider,
    Grid,
    LinearProgress,
    Typography
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

    const handleNombreClick = (perro) => {
        setPerroSeleccionado(perro);
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
        const response = await axios.get('https://dog.ceo/api/breeds/image/random');

        try {
            const info = await response.json();
            const fotoExistente = perros.some(perro => perro.url_foto === info.message);

            if (!fotoExistente) {
                setFoto({
                    imagen: info.message
                });
                fotoUnica = info.message;
            }
        } catch (error) {
            console.error("Error al obtener la foto:", error);
        }
    }

    setIsLoading(false);
    setLoadingMessage("");
};

const RegistrarPerro = async (nombre, descripcion) => {
    try {

            setDog({
                nombre: nombre,
                imagen: foto,
                descripcion: descripcion,
            })

    } catch (error) {

    } finally {
        setNombre("")
        setdescripcion("")
    }
}


const RegistrarPerro2 = async (nombre, descripcion) => {
    try {
    const response = await axios.post(
        "http://localhost:8000/api/perros",
        {
        nombre: nombre,
        url_foto: foto,
        descripcion: descripcion,
        }
        );

        if (response.status === 200) {
            console.log("Perro registrado exitosamente");
        } else {
            console.error("Error al registrar el perro");
        }
        } catch (error) {
        console.error("Error en la solicitud:", error);
        } finally {
            setNombre("");
            setDescripcion("");
        }
    };

{/*ESTA ES LA PARTE QUE MUESTRA LOS PERROS CREADOS*/}
const ListaPerros = ({ perros }) => {
    return (
    <List>
        {perros.map((perro, index) => (
            <ListItem key={index}>
                <ListItemAvatar>
                <Avatar alt={perro.nombre} src={perro.url_foto} />
            </ListItemAvatar>
            <ListItemText primary={perro.nombre} secondary={perro.descripcion} onClick={() => handleNombreClick(perro)}/>
        </ListItem>
        ))}
    </List>
    );
};

const AceptaPerros2 = async (valor) => {
    try {
        const response = await axios.post(
        `http://localhost:8000/api/interaccion/preferencia${valor.id}`,
        {
            perro_id: valor.id,
            perro_candidato_id: valor.candidatoId,
            preferencia: "a",
        }
        );

        if (response.status === 200) {
            const data = response.data;
            if (data.message === "¡Hay match!") {
            Swal.fire({
                title: "¡Hay match!",
                text: "¡Felicidades, has hecho match con este perro!",
                icon: "success",
            });
            } else {
            Swal.fire({
                title: "OK",
                text: "Perro aceptado exitosamente",
                icon: "success",
            });
            }
        } else {
        Swal.fire({
            title: "Error",
            text: "Error al aceptar el perro",
            icon: "error",
            });
        }
        } catch (error) {
        Swal.fire({
            title: "Error",
            text: "Error en la solicitud",
            icon: "error",
        });
        console.error("Error en la solicitud:", error);
        }
    };


const RechazaPerros2 = async (valor) => {
    try {
        const response = await axios.post(
        `http://localhost:8000/api/interaccion/preferencia${valor.id}`,
        {
            perro_id: valor.id,
            perro_candidato_id: valor.candidatoId,
            preferencia: "r",
        }
        );

        if (response.status === 200) {
            console.log("Perro rechazado exitosamente");
        Swal.fire({
            title: "OK",
            text: "Perro rechazado exitosamente",
            icon: "success",
        });
        } else {
        Swal.fire({
            title: "Error",
            text: "Error al rechazar el perro",
            icon: "error",
            });
        }
        } catch (error) {
        Swal.fire({
            title: "Error",
            text: "Error en la solicitud",
            icon: "error",
        });
        console.error("Error en la solicitud:", error);
        }
    };

//AQUI TERMINA LO NUEVO
    const getDogs = async () => {
        setIsLoading(true)
        setLoadingMessage("CARGANDO PERRITO...")
        try {
            const response = await fetch('https://dog.ceo/api/breeds/image/random')
            response.json().then((info) => {
                setDog({
                    nombre: getNombreRandom(),
                    imagen: info.message,
                    descripcion: loremIpsum({
                        count: 2,
                        units: "sentences",
                    }),
                })
            })
        } catch (error) {

        } finally {
            setIsLoading(false)
            setLoadingMessage("")
        }
    }

    function getNombreRandom() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        let nombreRandom = '';
        for (let i = 0; i < 6; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            nombreRandom += characters.charAt(randomIndex);
        }
        return nombreRandom;
    }

    const ArrepentidoDeRechazar = (valor) => {
        if (!ListaAceptados.includes(valor)) {
            setListaAceptados((ListaAceptados) => [valor, ...ListaAceptados]);
            let quitar = ListaRechazados.filter((item) => item !== valor);
            setListaRechazados(quitar);
            setExpandedIndexRechazados(null)
        }
    }

    const ArrepentidoDeAceptarAmigaTeEntiendo = (valor) => {
        console.log(!ListaRechazados.includes(valor))
        if (!ListaRechazados.includes(valor)) {
            setListaRechazados((ListaRechazados) => [valor, ...ListaRechazados]);
            let quitar = ListaAceptados.filter((item) => item !== valor);
            setListaAceptados(quitar);
            setExpandedIndexAceptados(null)
        }
    }

    const AceptaPerros = (valor) => {
        setListaAceptados((cualquiercosa) => [valor, ...cualquiercosa]);
        console.log(ListaAceptados)
        getDogs()
    }

    const RechazaPerros = (valor) => {
        setListaRechazados((ListaRechazados) => [valor, ...ListaRechazados]);
        console.log(ListaRechazados)
        getDogs()
    }

    useEffect(() => {
        getDogs()
        obtenerFotoUnica()
    }, [])

    return (
        <>
            <Grid container spacing={2} direction="row">
                <Grid item md={4} sm={12}>
                    <Typography color={"black"} variant="h5" align="center">
                        T I N D E R
                    </Typography>
                    {isLoading && <LinearProgress />}
                    {LoadingMessage && <p>{LoadingMessage}</p>}




<Card
    sx={{
        transition: "0.2s",
        "&:hover": {
            transform: "scale(1.02)",
        },
        borderRadius: '10px',
        border: '1px solid #000',
    }}
>
    <FotoCard props={foto} />
    <CardContent>
        <TextField
            label="Nombre"
            variant="outlined"
            margin="normal"
            fullWidth
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
        />
        <TextField
            label="Descripción"
            variant="outlined"
            margin="normal"
            fullWidth
            multiline
            rows={4}
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
        />
    </CardContent>
    <CardActions>
        <Button variant="contained" onClick={() => obtenerFotoUnica()} disabled={isLoading}>
            OTRA FOTO
        </Button>
        <Button variant="contained" onClick={() => RegistrarPerro2(nombre, descripcion)} disabled={isLoading}>
            REGISTRAR PERRO
        </Button>
    </CardActions>
</Card>

{/*ESTA ES LA PARTE QUE MUESTRA EL PERRO Y LOS BOTONES*/}


<Grid item md={4} sm={12}>
    <Typography color={"black"} variant="h5" align="center">
        L I S T A   D E   P E R R O S
    </Typography>
    <ListaPerros perros={perros} />
</Grid>


{perroSeleccionado && (
    <Card>
        <DogCard props={perroSeleccionado} tipo="principal" />
        <CardActions>
        <Button variant="contained" onClick={() => AceptaPerros2(perroSeleccionado)} disabled={isLoading}>
            ACEPTAR
        </Button>
        <Button color="error" onClick={() => RechazaPerros2(perroSeleccionado)} disabled={isLoading}>
            RECHAZAR
        </Button>

    </CardActions>
    </Card>
)}


<Button
    variant="contained"
    onClick={() => history.push(`/aceptados-rechazados/${perroSeleccionado.id}`)}
    disabled={isLoading}
>
    Ver Aceptados y Rechazados
</Button>



                    <Card
                        sx={{
                            transition: "0.2s",
                            "&:hover": {
                                transform: "scale(1.02)",
                            },
                            borderRadius: '10px',
                            border: '1px solid #000',
                        }}
                    >
                        <DogCard props={dog} tipo="principal" />
                        <CardActions >
                            <Button variant="contained" onClick={() => AceptaPerros(dog)} disabled={isLoading}>
                                ACEPTAR
                            </Button>
                            <Button color="error" onClick={() => RechazaPerros(dog)} disabled={isLoading}>
                                RECHAZAR
                            </Button>
                        </CardActions>
                    </Card>

                </Grid>

                <Grid item md={4} sm={12}>
                    <Typography color={"black"} variant="h5" align="center">
                        A C E P T A D O S
                    </Typography>
                    <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
                        {ListaAceptados.map((cosa, index) => (
                            <Grid item key={index} >
                                <Card
                                    sx={{
                                        borderRadius: '10px',
                                        border: '1px solid #000',
                                    }}
                                >
                                    <DogCard props={cosa} tipo="secundario" />
                                    <CardActions disableSpacing>
                                        <Button color="error" onClick={() => ArrepentidoDeAceptarAmigaTeEntiendo(cosa)} >RECHAZAR</Button>
                                        <ExpandMore
                                            expand={expandedIndexAceptados === index}
                                            onClick={() => handleExpandClickAceptados(index)}
                                            aria-expanded={expandedIndexAceptados === index}
                                            aria-label="show more"
                                        >
                                            <ExpandMoreIcon />
                                        </ExpandMore>
                                    </CardActions>
                                    <Collapse in={expandedIndexAceptados === index} timeout="auto" unmountOnExit>
                                        <CardContent>
                                            <Typography>
                                                {cosa.descripcion}
                                            </Typography>
                                        </CardContent>
                                    </Collapse>
                                </Card>
                            </Grid>
                        ))}
                    </div>
                </Grid>

                <Grid item md={4} sm={12}>
                    <Typography color={"black"} variant="h5" align="center">
                        R E C H A Z A D O S
                    </Typography>
                    <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
                        {ListaRechazados.map((cosa, index) => (
                            <Grid item key={index} >
                                <Card
                                    sx={{
                                        borderRadius: '10px',
                                        border: '1px solid #000',
                                    }}
                                >
                                    <DogCard props={cosa} tipo="terciario" />
                                    <CardActions disableSpacing>
                                        <Button variant="contained" onClick={() => ArrepentidoDeRechazar(cosa)} >ACEPTAR</Button>
                                        <ExpandMore
                                            expand={expandedIndexRechazados === index}
                                            onClick={() => handleExpandClickRechazados(index)}
                                            aria-expanded={expandedIndexRechazados === index}
                                            aria-label="show more"
                                        >
                                            <ExpandMoreIcon />
                                        </ExpandMore>
                                    </CardActions>
                                    <Collapse in={expandedIndexRechazados === index} timeout="auto" unmountOnExit>
                                        <CardContent>
                                            <Typography>
                                                {cosa.descripcion}
                                            </Typography>
                                        </CardContent>
                                    </Collapse>
                                </Card>
                            </Grid>
                        ))}
                    </div>
                </Grid>
            </Grid>

        </>
    )
}