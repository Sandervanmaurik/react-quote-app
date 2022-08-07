import { Snackbar } from "@mui/material";
import React from "react";

const handleError = ({ error }: any) => {
    return (
        <Snackbar
            open={true}
            autoHideDuration={5000}
            onClose={() => { }}
            action={<></>}
        />
    )
}
export default handleError;