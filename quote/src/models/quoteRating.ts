import React from "react";

export class QuoteRating{
    id?: string;
    name?: string;
    voters?: string[] = [];
    voteCount?: number;
    color?: string;
    icon: string | undefined;
}