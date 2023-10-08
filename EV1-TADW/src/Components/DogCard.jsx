import {
    CardContent, CardMedia, Typography
} from "@mui/material"

export default function DogCard({ props, tipo }) {
    return (
        <>
            <CardMedia
                component="img"
                sx={{ maxHeight: 400 }}
                image={props.imagen}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div" textAlign={"center"} style={{ fontWeight: 'bold' }}>
                    {props.nombre}
                </Typography>
                {tipo === 'principal' ? (
                    <Typography variant="body2" color="text.secondary">
                        {props.descripcion}
                    </Typography>
                ) : null}
            </CardContent>
        </>
    )
}