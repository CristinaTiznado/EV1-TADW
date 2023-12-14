import React from "react"
import {
    Button,
    Card,
    CardActions,
    CardContent,
    Grid,
    LinearProgress,
    Typography,
    TextField,
} from "@mui/material"

import { useEffect, useState } from "react"
import { loremIpsum } from 'lorem-ipsum'
import FotoCard from "../Components/FotoCard"

import axios from "axios";


export default function Inicio() {
    const [isLoading, setIsLoading] = useState(false)
    const [LoadingMessage, setLoadingMessage] = useState("")

    const [foto, setFoto] = useState({imagen: ''})
    const [nombre, setNombre] = useState({nombre: ''})
    const [descripcion, setdescripcion] = useState({descripcion: ''})
    
    const [perros, setPerros] = useState([]);
   

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
        url_foto: foto.imagen,
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


    useEffect(() => {
        getDogs()
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
            <Grid container spacing={2} direction="row" justifyContent="center">
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
            placeholder="Ingrese el nombre"
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
            placeholder="Ingrese la descripción del perro"
            value={descripcion}
            onChange={(e) => setdescripcion(e.target.value)}
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
                </Grid>
            </Grid>

        </>
    )
}
