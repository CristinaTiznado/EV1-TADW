import React from "react"
import {
    Button,
    Card,
    CardActions,
    Grid,
    LinearProgress,
    Typography
} from "@mui/material"
import { useEffect, useState } from "react"
import DogCard from "../Components/DogCard"
import { loremIpsum } from 'lorem-ipsum'
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton'

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
    const [isLoading, setIsLoading] = useState(false)
    const [LoadingMessage, setLoadingMessage] = useState("")


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
            }
        } catch (error) {
            console.error("Error al obtener la foto:", error);
        }
    }

    setIsLoading(false);
    setLoadingMessage("");
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
                                </Card>
                            </Grid>
                        ))}
                    </div>
                </Grid>
            </Grid>

        </>
    )
}