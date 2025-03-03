import {Alert, AlertTitle, Box, Typography} from "@mui/material";
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';

interface WorkingOnItProps {
    message?: string;
}

const WorkingOnIt = ({ message = "This page is under development." }: WorkingOnItProps) => {
    return (
        <Box sx={{ width: "100%", display: "flex", justifyContent: "center", mt: 3 }}>
            <Alert severity="warning" icon={<HourglassEmptyIcon />} sx={{
                width: "50vw"
            }}>
                <AlertTitle>
                    <Typography>
                        <strong>Working on it!</strong>
                    </Typography>
                </AlertTitle>
                {message}
            </Alert>
        </Box>
    );
};

export default WorkingOnIt;
