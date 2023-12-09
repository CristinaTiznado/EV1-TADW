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