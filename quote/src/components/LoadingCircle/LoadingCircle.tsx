import { CircularProgress } from '@mui/material';
import React from 'react';
import './LoadingCircle.scss';

type props = {
    color: string;
    height: string;
    width: string;
    loadingText: string;
}
function LoadingCircle({ color, height, width, loadingText }: props) {

    return (
        <div className='loading-container'>
            <CircularProgress style={{ height: height, width: width, color: color }} />
            <span>{loadingText}</span>
        </div>
    )
}
export default LoadingCircle;