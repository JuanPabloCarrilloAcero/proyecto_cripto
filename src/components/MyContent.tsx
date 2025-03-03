import React from "react";
import {Box} from "@mui/material";

const MyContent = ({children}: any) => {
    return (
        <Box
            sx={{
                width: "100%",
                height: "100%",
                overflowX: "auto",
                overflowY: "auto",
                p: 2,
            }}
        >
            {children}
        </Box>
    );
};

export default MyContent;
