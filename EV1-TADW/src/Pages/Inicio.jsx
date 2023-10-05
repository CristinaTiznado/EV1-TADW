import {
    Box,
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

export default function Inicio() {
    const [dog, setDog] = useState({ nombre: '', imagen: '', descripcion: '' })

    const getDogs = async () => {
        const response = await fetch('https://dog.ceo/api/breeds/image/random')
        response.json().then((info) => {
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

    return (
        <>
            <Grid container spacing={2} direction="row" >
                <Grid item sm={6} md={4}>

                    <Card style={{ maxHeight: 400 }}>
                        <DogCard props={dog} />
                        <CardActions>
                            <Button size="small">
                                Link
                            </Button>
                        </CardActions>
                    </Card>

                </Grid>
                <Grid item sm={6} md={4}>

                    <Card style={{ maxHeight: 400 }}>
                        <DogCard props={dog} />
                        <CardActions>
                            <Button size="small">
                                Link
                            </Button>
                        </CardActions>
                    </Card>

                </Grid>
                <Grid item sm={6} md={4}>

                    <Card style={{ maxHeight: 400 }}>
                        <DogCard props={dog} />
                        <CardActions>
                            <Button size="small">
                                Link
                            </Button>
                        </CardActions>
                    </Card>

                </Grid>
            </Grid>
        </>
    )
}