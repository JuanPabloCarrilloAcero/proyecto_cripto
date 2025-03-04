import React from "react";
import {Route, Routes} from "react-router-dom";
import Navbar from "./components/Navbar";
import Chat from "./components/Chat/Chat";
import {Container} from "@mui/material";
import WorkingOnIt from "./components/WorkingOnIt";
import Login from "./components/Login";

function App() {

    const storedUser = localStorage.getItem("user");
    if (storedUser === null) {
        return (<>
                <Login/>
            </>);
    }

    return (<>
            <Navbar/>
            <Container>
                <Routes>
                    <Route path="/" element={<Chat/>}/>
                    <Route path="/about" element={<WorkingOnIt/>}/>
                    <Route path="/contact" element={<WorkingOnIt/>}/>
                </Routes>
            </Container>
        </>);
}

export default App;
