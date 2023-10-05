import { Route, Routes } from "react-router-dom"
import Inicio from "./src/Pages/Inicio"

const RouterApp = () => {
    return <LogedInRoutes/>
}

const LogedInRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/" element= {<Inicio/>}/>
            </Routes>
        </>
    )
}

export default RouterApp