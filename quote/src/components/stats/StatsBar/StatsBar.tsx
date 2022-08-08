import { Grid } from "@mui/material";
import React from "react";
import './StatsBar.scss';
type props = {
    voteCount: number;
    backgroundColor: string;
    height: string;
}

export default function StatsBar({ voteCount, backgroundColor, height }: props) {
    return (
        <Grid item marginTop="auto" height={height} className='noselect bar' style={{ backgroundColor: backgroundColor, position: "relative"}}>
            <span className="count-text">{voteCount}</span>
        </Grid>
    )
}
