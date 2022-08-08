import { CircularProgress, CircularProgressProps, CircularProgressPropsColorOverrides } from '@mui/material';
import React from 'react';
import './LoadingCircle.scss';

type props = {
    color: "primary" | "secondary" | "error" | "info" | "success" | "warning" | "inherit";
    height: string;
    width: string;
    loadingText: string;
}
function LoadingCircle({ color, height, width, loadingText }: props) {

    return (
        <div className='loading-container'>
            <CircularProgress color={color} style={{ height: height, width: width }} />
            <span>{loadingText}</span>
        </div>
    )
}
export default LoadingCircle;