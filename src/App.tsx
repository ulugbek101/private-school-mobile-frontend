import {BrowserRouter, Route, Routes} from "react-router-dom";

import DashboardPage from "./pages/DashboardPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";

import "./App.css"


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<DashboardPage/>} path={"/"}/>
                <Route element={<LoginPage/>} path={"/login"}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App
