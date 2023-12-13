import { Route, Routes } from "react-router-dom"
import Inicio from "./src/Pages/Inicio"
import Registro from "./src/Pages/Registro"

const RouterApp = () => {
    return <LogedInRoutes/>
}

const LogedInRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/" element= {<Inicio/>}/>
                <Route path="/registro" element= {<Registro/>}/>
            </Routes>
        </>
    )
}

export default RouterApp