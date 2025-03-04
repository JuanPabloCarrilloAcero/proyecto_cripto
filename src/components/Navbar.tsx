import React from "react";
import {AppBar, Button, Toolbar, Typography} from "@mui/material";
import {Link} from "react-router-dom";

function Navbar() {

    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("chatData")
        window.location.reload();
    }

    return (<AppBar position="static">
            <Toolbar>
                <Typography variant="h6" sx={{flexGrow: 1, userSelect: "none"}}>
                    criptoECC
                </Typography>
                <Typography variant="h6" sx={{flexGrow: 6, userSelect: "none", textAlign: "center"}}>
                    {localStorage.getItem("user")}
                </Typography>
                <Button color="inherit" component={Link} to="/">Home</Button>
                <Button color="inherit" onClick={handleLogout}>Logout</Button>
            </Toolbar>
        </AppBar>);
}

export default Navbar;
