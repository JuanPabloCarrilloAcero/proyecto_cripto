import {Box, TextField, Typography, Button} from "@mui/material";
import {useState} from "react";

interface ChatWindowProps {
    chat: any;
    onClose: () => void;
}

const ChatWindow = ({chat, onClose}: ChatWindowProps) => {
    
    const [messages, setMessages] = useState<string[]>([]);
    const [input, setInput] = useState("");

    const handleSend = () => {
        if (input.trim() === "") return;
        setMessages([...messages, input]);
        setInput("");
    };

    return (
        <Box sx={{
            width: "50vw",
            height: "50vh",
            backgroundColor: "#fff",
            borderRadius: 2,
            boxShadow: 3,
            display: "flex",
            flexDirection: "column",
            p: 2
        }}>

            <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1}}>
                <Typography variant="h6">{chat.name}</Typography>
                <Button size="small" onClick={onClose} color="error">Close</Button>
            </Box>

            <Box sx={{
                flexGrow: 1,
                overflowY: "auto",
                border: "1px solid #ccc",
                borderRadius: 1,
                p: 1,
                mb: 1
            }}>
                {messages.length > 0 ? messages.map((msg, index) => (
                    <Typography key={index} sx={{backgroundColor: "#f1f1f1", p: 1, mb: 1, borderRadius: 1}}>
                        {msg}
                    </Typography>
                )) : (
                    <Typography sx={{color: "#aaa"}}>No messages yet</Typography>
                )}
            </Box>

            <TextField
                variant="outlined"
                size="small"
                fullWidth
                placeholder="Type a message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                sx={{mt: "auto"}}
            />
            <Button variant="contained" fullWidth sx={{mt: 1}} onClick={handleSend}>Send</Button>
        </Box>
    );
};

export default ChatWindow;
