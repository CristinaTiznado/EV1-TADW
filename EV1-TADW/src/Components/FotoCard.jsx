import {
    CardContent, CardMedia, Typography
} from "@mui/material"

export default function FotoCard({ props }) {
    return (
        <>
            <CardMedia
                component="img"
                sx={{ maxHeight: 400 }}
                image={props.imagen}
            />
            <CardContent>

            </CardContent>
        </>
    )
}