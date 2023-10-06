import {
    Card, CardContent, CardHeader, CardMedia, Typography
} from "@mui/material"
import axios from "axios"

export default function DogCard({ props }) {
    return (
        <>
            <CardMedia
                component="img"
                sx={{ maxHeight:300 }}
                image={props.imagen}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {props.nombre}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {props.descripcion}
                </Typography>
            </CardContent>
        </>
    )
}