import {
    Box,
    Button,
    Card,
    CardActions,
    CardHeader,
    Divider,
    Grid,
    Typography
} from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import DogCard from "../Components/DogCard"

export default function Inicio() {
    const [dog, setDog] = useState({ nombre: '', imagen: '', descripcion: '' })
    const [ListaAceptados, setListaAceptados] = useState([])
    const [ListaRechazados, setListaRechazados] = useState([])

    /*const getDogs = async () => {
        const response = await fetch('https://dog.ceo/api/breeds/image/random')
        response.json().then((info) => {
            setDog({
                nombre: "Perrito",
                imagen: info.message,
                descripcion: "super descripción"
            })
        })
    }*/
function getNombreRandom() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let nombreRandom = '';
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      nombreRandom += characters.charAt(randomIndex);
    }
    return nombreRandom;
  }
  
  const getDogs = async () => {
    const responseDog = await fetch('https://dog.ceo/api/breeds/image/random');
    const dogInfo = await responseDog.json();
    const dogImage = dogInfo.message;
    const nombreRandom = getNombreRandom
();

    setDog({
      nombre: nombreRandom,
      imagen: dogImage,
      descripcion: "super descripción"
    });
  }

    const ArrepentidoDeRechazar = (valor) => {
        if (!ListaAceptados.includes(valor)){
            setListaAceptados((ListaAceptados) => [valor,...ListaAceptados]);
            let quitar = ListaRechazados.filter((item) => item !==valor);
            setListaRechazados(quitar);
            console.log(ListaRechazados)
        }
    }

    const ArrepentidoDeAceptarAmigaTeEntiendo = (valor) => {
        console.log(!ListaRechazados.includes(valor))
        if (!ListaRechazados.includes(valor)){
            setListaRechazados((ListaRechazados) => [valor,...ListaRechazados]);
            let quitar = ListaAceptados.filter((item) => item !==valor);
            console.log("ELEMENTO QUITADO: ", quitar)
            setListaAceptados(quitar);
            console.log("ACABO DE APLICAR EL SETLISTAACEPTADOS:",setListaAceptados(quitar))
            console.log("LISTA ACEPTADOS: ",ListaAceptados)
        }
    }

    const AceptaPerros = (valor) => {
        setListaAceptados((cualquiercosa) => [valor,...cualquiercosa]);
        console.log(ListaAceptados)
        getDogs()
    }

    const RechazaPerros = (valor) => {
        setListaRechazados((ListaRechazados) => [valor,...ListaRechazados]);
        console.log(ListaRechazados)
        getDogs()
    }

    useEffect(() => {
        getDogs()
    }, [])

    return (
        <>
            <Grid container spacing={2} direction="row">
                <Grid item md={4} >
                    <Card style={{ maxHeight: 600 }}>
                        <Typography color={"black"} variant="h5" >
                                T I N D E R
                        </Typography>
                        <DogCard props={dog} />
                        <CardActions>
                            <Button onClick={() => AceptaPerros(dog)}>
                                aceptar
                            </Button>
                            <Button onClick={() => RechazaPerros(dog)}>
                                rechazar
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>

                <Grid item md={4}>
                    <div style={{ maxHeight: '446px', overflowY: 'auto' }}>
                        {ListaAceptados.map((cosa, index) => (
                        <Grid item key={index}>
                            <Card>
                            <DogCard props={cosa} />
                            <CardActions>
                                <Button onClick={() => ArrepentidoDeAceptarAmigaTeEntiendo(cosa)}>ME ARREPENTÍ</Button>
                            </CardActions>
                            </Card>
                        </Grid>
                        ))}
                    </div>
                </Grid>

                <Grid item md={4}>
                    <div style={{ maxHeight: '446px', overflowY: 'auto' }}>
                        {ListaRechazados.map((cosa, index) => (
                            <>
                                <Grid item key = {index}>
                                    <Card>
                                        <DogCard props={cosa}/>
                                        <CardActions>
                                            <Button onClick={() => ArrepentidoDeRechazar(cosa)} >MEARREPENTI</Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            </>
                        ))}
                    </div>
                </Grid>
            </Grid>
        </>
    )
}