import {
    Card, CardContent, CardHeader, CardMedia, Typography
} from "@mui/material"
import axios from "axios"

export default function DogCard({ props }) {
    return (
        <>
            <CardHeader>
                <Typography variant="h5" component="div">
                    {props.nombre}
                </Typography>
            </CardHeader>
            <CardMedia
                component="img"
                sx={{ height:200 }}
                image={props.imagen}
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {props.descripcion}
                </Typography>
            </CardContent>
        </>
    )
}