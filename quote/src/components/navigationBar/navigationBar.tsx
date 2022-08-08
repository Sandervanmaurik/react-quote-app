import { render } from '@testing-library/react';
import React, { useEffect, useState } from 'react'
import { Quote } from '../../models/quote';
import LoadingCircle from '../LoadingCircle/LoadingCircle';
import './NavigationBar.scss';
type SimpleQuote = { id: string, hasVoted: boolean };

type props = {
    quotes: SimpleQuote[],
    onClick: any,
    selectedQuoteId?: string
}

export default function NavigationBar({ quotes, onClick, selectedQuoteId }: props) {
    function isSelected(quote: SimpleQuote) {
        return (quote.id === selectedQuoteId) ? true : false;
    }

    if(!quotes || quotes.length == 0){
        return <LoadingCircle color='#0d98ba' height='100px' width="100px" loadingText='Loading available quotes...'></LoadingCircle>
    }

    return (
        <div className='toolbar-container'>
            {quotes?.map((item: any) => {
                return (
                    <div className={`toolbar-item ${isSelected(item) ? "selected" : ""} ${item.hasVoted ? "voted" : ""}`} key={item.id} onClick={() => onClick(item.id)}>
                        <span className='noselect'>{item.id}</span>
                    </div>
                )
            })}
        </div>
    )
}