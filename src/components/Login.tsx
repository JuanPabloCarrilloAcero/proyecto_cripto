import {Box, Button, Container, Paper, TextField, Typography} from "@mui/material";
import React, {useState} from "react";
import axios from "axios";

function Login() {
    const [username, setUsername] = useState("");
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (!username) {
            setError("Username is required");
            return;
        }

        try {
            const response = await axios.post(`http://127.0.0.1:8000/user/?username=${username}`);

            if (response.data) {
                setSuccess("Login Successful!");
                setError("");
                if (response.data.message === "User created" || response.data.message === "User already exists") {
                    localStorage.setItem("user", username);
                }
                window.location.reload();
            } else {
                setError("Invalid username or password");
            }
        } catch (err) {
            setError("Login failed. Check your information and try again.");
            console.error("API Error:", err);
        }

    };

    return (<Container maxWidth="xs">
        <Paper elevation={3} style={{padding: "20px", marginTop: "50px"}}>
            <Typography variant="h5" align="center" gutterBottom>
                Login
            </Typography>
            {error ? <Typography variant="body1" color="error" align="center" gutterBottom>
                {error}
            </Typography> : null}
            <form onSubmit={handleSubmit}>
                <Box mb={2}>
                    <TextField
                        fullWidth
                        label="Username"
                        variant="outlined"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </Box>
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Login
                </Button>
            </form>
        </Paper>
    </Container>);
}

export default Login;
