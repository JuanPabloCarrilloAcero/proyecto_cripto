import {Avatar, Box, Typography} from "@mui/material";
import {useState} from "react";
import MyContent from "../MyContent";
import ChatWindow from "./ChatWindow";

const chatData = [
    {id: 1, name: "New chat", img: "https://via.placeholder.com/100", chat: "https://via.placeholder.com/400"},
    {
        id: 2,
        name: "friend_1",
        img: "https://via.placeholder.com/100/FF5733",
        chat: "https://via.placeholder.com/400/FF5733"
    },
    {
        id: 3,
        name: "friend_2",
        img: "https://via.placeholder.com/100/33FF57",
        chat: "https://via.placeholder.com/400/33FF57"
    },
    {
        id: 4,
        name: "friend_3",
        img: "https://via.placeholder.com/100/3357FF",
        chat: "https://via.placeholder.com/400/3357FF"
    },
    {
        id: 5,
        name: "friend_4",
        img: "https://via.placeholder.com/100/FF5733",
        chat: "https://via.placeholder.com/400/FF5733"
    }
];

interface ChatProps {
    id: number;
    name: string;
    img: string;
    chat: string;
}

function Chat() {

    const [open, setOpen] = useState(false);
    const [selectedChat, setSelectedChat] = useState<ChatProps | null>(null);

    const handleClick = (chat: ChatProps) => {
        if (open && selectedChat !== null && selectedChat.id === chat.id) {
            handleClose();
            return;
        }

        handleOpen(chat);
    }

    const handleOpen = (chat: any) => {
        setSelectedChat(chat);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedChat(null);
    };


    return (
        <>
            <Box sx={{display: "flex", overflowX: "auto", mt: 2, gap: 2, p: 1, whiteSpace: "nowrap"}}>
                {chatData.map((chat: ChatProps) => (
                    <Box key={chat.id} sx={{textAlign: "center", cursor: "pointer"}} onClick={() => handleClick(chat)}>
                        <Avatar
                            src={chat.img}
                            sx={{
                                width: 70,
                                height: 70,
                                border: "3px solid",
                                borderColor: selectedChat !== null && selectedChat.id === chat.id ? "#e1306c" : "#fff",
                                padding: "2px",
                            }}
                        />
                        <Typography variant="caption" sx={{display: "block", mt: 1}}>
                            {chat.name}
                        </Typography>
                    </Box>
                ))}
            </Box>
            {
                open ?
                    <MyContent>
                        <Box sx={{
                            alignContent: "center",
                            display: "flex",
                            justifyContent: "center",
                        }}>
                            <ChatWindow chat={selectedChat} onClose={handleClose}/>
                        </Box>
                    </MyContent>
                    :
                    null
            }
        </>
    );
}

export default Chat;