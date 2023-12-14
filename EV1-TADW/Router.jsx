import { Route, Routes } from "react-router-dom"
import Inicio from "./src/Pages/Inicio"
import Registro from "./src/Pages/Registro"
import Superinicio from "./src/Pages/superinicio"
import Perfil from "./src/Pages/Perfil"
import Aceptadosyrechazados from "./src/Pages/aceptadosyrechazados"

const RouterApp = () => {
    return <LogedInRoutes/>
}

const LogedInRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/" element= {<Inicio/>}/>
                <Route path="/registro" element= {<Registro/>}/>
                <Route path="/inicio" element= {<Superinicio/>}/>
                <Route path="/perfil" element= {<Perfil/>}/>
                <Route path="/aceptadosyrechazados" element= {<Aceptadosyrechazados/>}/>
            </Routes>
        </>
    )
}

export default RouterApp