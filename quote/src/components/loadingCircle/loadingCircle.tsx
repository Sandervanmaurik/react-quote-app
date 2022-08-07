import { CircularProgress, CircularProgressProps, CircularProgressPropsColorOverrides } from '@mui/material';
import React from 'react';

type props = {
    color: "primary" | "secondary" | "error" | "info" | "success" | "warning" | "inherit";
    height: string;
    width: string;
}
function LoadingCircle({ color, height, width }: props) {

    return (
        <CircularProgress color={color} style={{ height: height, width: width }} />
    )
}
export default LoadingCircle;