import React from "react";

export class QuoteRating{
    id?: string;
    name?: string;
    voters?: string[] = [];
    color?: string;
    icon?: React.ReactNode;
}