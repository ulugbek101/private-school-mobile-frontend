import {BrowserRouter, Route, Routes} from "react-router-dom";

import DashboardPage from "./pages/DashboardPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import RootLayout from "./components/RootLayout.tsx"


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<RootLayout />} path="/">
                    <Route element={<DashboardPage/>} index />
                </Route>
                <Route element={<LoginPage/>} path={"/login"} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
