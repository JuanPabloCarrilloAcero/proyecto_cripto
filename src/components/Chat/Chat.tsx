import {Avatar, Box, IconButton, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import MyContent from "../MyContent";
import ChatWindow from "./ChatWindow";
import {Delete} from "@mui/icons-material";

interface ChatProps {
    id: number;
    name: string;
    img: string;
    chat: string;
}

function Chat() {

    const [open, setOpen] = useState(false);
    const [selectedChat, setSelectedChat] = useState<ChatProps | null>(null);
    const [chatData, setChatData] = useState<ChatProps[]>([]);

    useEffect(() => {
        const data = localStorage.getItem("chatData");
        console.log("data", data);
        if (data) {
            setChatData(JSON.parse(data));
        } else {
            setChatData([{
                id: 1, name: "New chat", img: "https://via.placeholder.com/100", chat: "https://via.placeholder.com/400"
            },]);
        }
    }, []);

    useEffect(() => {
        if (chatData.length !== 0) {
            localStorage.setItem("chatData", JSON.stringify(chatData));
        }
    }, [chatData]);

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

    const handleDelete = (id: number) => {
        setChatData(chatData.filter(chat => chat.id !== id));
    };

    const isNewChat = (chat: any) => {
        return chat.name === "New chat";
    }

    const AvatarCircle = ({chat}: any) => {
        const [hover, setHover] = useState(false);

        return (<Box
            key={chat.id}
            sx={{
                textAlign: "center", cursor: "pointer", position: "relative", display: "inline-block"
            }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={() => handleClick(chat)}
        >
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
            {hover && !isNewChat(chat) ? (<IconButton
                sx={{
                    position: "absolute",
                    top: -5,
                    right: -5,
                    backgroundColor: "rgba(255,255,255,0.8)",
                    ":hover": {backgroundColor: "rgba(255,255,255,1)"}
                }}
                size="small"
                onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(chat.id);
                }}
            >
                <Delete sx={{color: "#e1306c"}}/>
            </IconButton>) : null}
        </Box>);
    }


    return (<>
        <Box sx={{display: "flex", overflowX: "auto", mt: 2, gap: 2, p: 1, whiteSpace: "nowrap"}}>
            {chatData.map((chat: ChatProps) => {
                return <AvatarCircle chat={chat} key={chat.id}/>;
            })}
        </Box>
        {open ? <MyContent>
            <Box sx={{
                alignContent: "center", display: "flex", justifyContent: "center",
            }}>
                <ChatWindow key={selectedChat?.id} chat={selectedChat} onClose={handleClose} chatData={chatData} setChatData={setChatData}
                />
            </Box>
        </MyContent> : null}
    </>);
}

export default Chat;