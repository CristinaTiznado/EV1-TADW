import {
    Button,
    Card,
    CardActions,
    Divider,
    Grid,
    Typography
} from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import DogCard from "../Components/DogCard"

export default function Inicio(){
    const [dog, setDog] = useState({ nombre:'', imagen:'', descripcion:'' })
    const [ListaAceptados, setListaAceptados] = useState([])
    const [ListaRechazados, setListaRechazados] = useState([])

    const fetchDogs = async () => {
        const response = await fetch('https://dog.ceo/api/breeds/image/random')
        return response.json()
    }

    const getDogs = () => {
        fetchDogs().then((info) => {
            setDog({
                nombre: "Perrito",
                imagen: info.message,
                descripcion: "super descripción"
            })
        })
    }

    useEffect(() => {
        getDogs()
    }, [])

    const ArrepentidoDeRechazar = (valor) => {

        if (!ListaAceptados.includes(valor))
        {
            setListaAceptados((ListaAceptados) => [...ListaAceptados,valor]);
            quitar = ListaRechazados.filter((item) => item !==valor);
            setListaRechazados(quitar);
        }
    }

    const ArrepentidoDeAceptarAmigaTeEntiendo = (valor) => {

        if (!ListaRechazados.includes(valor))
        {
            setListaRechazados((ListaRechazados) => [...ListaRechazados,valor]);
            quitar = ListaAceptados.filter((item) => item !==valor);
            setListaAceptados(quitar);
        }
    }

    const AceptaPerros = (valor) => {
        setListaAceptados((cualquiercosa) => [...cualquiercosa,valor]);
        console.log(ListaAceptados)
        getDogs()
    }

    const RechazaPerros = (valor) => {
        setListaRechazados((ListaRechazados) => [...ListaRechazados,valor]);
    }

    return(
        <>
            <Grid container spacing={1}>
                <Grid item md={4} xs={6}>
                    <Card >
                        <DogCard props={dog}/>
                        <CardActions>
                            <Button onClick={() => AceptaPerros(dog)}>
                                aceptar
                            </Button>
                            <Button>
                                rechazar
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>

        <Grid>
            {ListaAceptados.map((cosa, index) => (
              <>
                <Grid item key = {index}>
                    <Card>
                        <DogCard props={cosa}/>
                    </Card>
                </Grid>
              </>
            ))}
        </Grid>



                <Grid item md={4} xs={6}>
                    <Card>
                        <DogCard props={ListaAceptados}/>
                    </Card>
                </Grid>
                <Grid item md={4} xs={6}>
                    <Card>
                        <DogCard props={ListaRechazados}/>
                    </Card>
                </Grid>
            </Grid>
        </>
    )
}