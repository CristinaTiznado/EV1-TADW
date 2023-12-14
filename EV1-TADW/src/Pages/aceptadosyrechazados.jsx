// AceptadosRechazados.js

import React, { useState, useEffect } from "react";
import {
    Typography,
    List,
    ListItem,
    ListItemText,
    Card,
    CardContent,
} from "@mui/material";
import axios from "axios";


const AceptadosRechazados = () => {
    const [aceptados, setAceptados] = useState([]);
    const [rechazados, setRechazados] = useState([]);

    useEffect(() => {
        const fetchAceptados = async () => {
            try {
            const response = await axios.get(
                `http://localhost:8000/api/perros/aceptados/${101}`
            );
            setAceptados(response.data);
            } catch (error) {
            console.error("Error al obtener la lista de perros aceptados:", error);
            }
        };

        const fetchRechazados = async () => {
            try {
            const response = await axios.get(
                `http://localhost:8000/api/perros/rechazados/${101}`
            );
            setRechazados(response.data);
            } catch (error) {
            console.error("Error al obtener la lista de perros rechazados:", error);
            }
        };

        //if (perroId) {
            fetchAceptados();
            fetchRechazados();
        //}
    }, []);

return (
    <>
    <Typography variant="h5" align="center">
        Aceptados y Rechazados del Perro
    </Typography>
    <Card>
        <CardContent>
            <Typography variant="h6">Aceptados:</Typography>
            <List>
            {aceptados.map((perro) => (
                <ListItem key={perro.id}>
                    <ListItemText primary={perro.nombre} />
                </ListItem>
            ))}
            </List>
            <Typography variant="h6">Rechazados:</Typography>
            <List>
            {rechazados.map((perro) => (
                <ListItem key={perro.id}>
                    <ListItemText primary={perro.nombre} />
                </ListItem>
            ))}
            </List>
        </CardContent>
    </Card>
    </>
);
};

export default AceptadosRechazados;
