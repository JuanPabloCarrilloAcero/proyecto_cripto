import {Alert, Box, Button, IconButton, Snackbar, TextField, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import axios from "axios";
import {Refresh} from "@mui/icons-material";

interface ChatWindowProps {
    chat: any;
    onClose: () => void;
    chatData: any;
    setChatData: any;
}

const ChatWindow = ({chat, onClose, chatData, setChatData}: ChatWindowProps) => {

    const currentUser = localStorage.getItem("user");

    const [messages, setMessages] = useState<any[]>([]);
    const [snackBar, setSnackBar] = useState({open: false, message: ""});
    const [input, setInput] = useState("");
    const [friend, setFriend] = useState("");

    useEffect(() => {
        fetchMessages().then();
    }, []);

    const fetchMessages = async () => {
        if (isNewChat) return;

        try {
            const response = await axios.get(`http://127.0.0.1:8000/chat/?username=${currentUser}&friend=${chat.name}`);
            setMessages(response.data);
        } catch (error: any) {
            if (error.response.data.detail) {
                setSnackBar({open: true, message: "Error sending message, " + error.response.data.detail});
            } else {
                setSnackBar({open: true, message: "Error sending message"});
            }
            console.error("Error sending message:", error);
        }
    }

    const handleSend = async () => {
        if (input.trim() === "") return;

        try {

            const response = await axios.post("http://127.0.0.1:8000/message/", {
                message: input, receiver: chat.name, sender: currentUser,
            });

            console.log("Message sent:", response.data);
            setInput("");
            fetchMessages().then();
        } catch (error: any) {
            if (error.response.data.detail) {
                setSnackBar({open: true, message: "Error sending message, " + error.response.data.detail});
            } else {
                setSnackBar({open: true, message: "Error sending message"});
            }
            console.error("Error sending message:", error);
        }
    };

    const handleNewChat = () => {
        if (friend.trim() === "") return;

        setChatData([...chatData, {
            id: chatData.length + 1,
            name: friend,
            img: "https://via.placeholder.com/100",
            chat: "https://via.placeholder.com/400"
        }]);
        setFriend("");
    }

    const isNewChat = chat.name === "New chat";

    return (<Box sx={{
        width: "50vw",
        height: isNewChat ? "100%" : "50vh",
        backgroundColor: "#fff",
        borderRadius: 2,
        boxShadow: 3,
        display: "flex",
        flexDirection: "column",
        p: 2
    }}>

        <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1}}>
            <Typography variant="h6">{chat.name}</Typography>
            <Box>
                {
                    !isNewChat ?
                        <IconButton onClick={fetchMessages} color="primary">
                            <Refresh/>
                        </IconButton> : null
                }
                <Button size="small" onClick={onClose} color="error">Close</Button>
            </Box>
        </Box>

        {isNewChat ? <>
            <TextField
                variant="outlined"
                size="small"
                fullWidth
                placeholder="Friend"
                value={friend}
                onChange={(e) => setFriend(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleNewChat()}
                sx={{mt: "auto"}}
            />
            <Button variant="contained" fullWidth sx={{mt: 1}} onClick={handleNewChat}>Create new chat</Button>
        </> : <>
            <Box sx={{
                flexGrow: 1, overflowY: "auto", border: "1px solid #ccc", borderRadius: 1, p: 1, mt: 1, mb: 1
            }}>
                {messages.length > 0 ? messages.map((msg, index) => (<Box
                        key={index}
                        sx={{
                            display: "flex", justifyContent: msg.sender === currentUser ? "flex-end" : "flex-start"
                        }}
                    >
                        <Typography
                            sx={{
                                backgroundColor: msg.sender === currentUser ? "#d1e7dd" : "#2196F3",
                                color: msg.sender === currentUser ? "#000" : "#fff",
                                p: 1,
                                mb: 1,
                                borderRadius: 1,
                                maxWidth: "60%",
                                textAlign: msg.sender === currentUser ? "right" : "left"
                            }}
                        >
                            {msg.mensaje}
                        </Typography>
                    </Box>)) : (<Typography sx={{color: "#aaa"}}>No messages yet</Typography>)}
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
        </>}

        <Snackbar
            open={snackBar.open}
            autoHideDuration={6000}
        >
            <Alert severity="error" variant="filled">
                {snackBar.message}
            </Alert>
        </Snackbar>
    </Box>);
};

export default ChatWindow;
