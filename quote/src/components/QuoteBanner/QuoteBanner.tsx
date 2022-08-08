import React from 'react';
import LoadingCircle from '../LoadingCircle/LoadingCircle';
import './QuoteBanner.scss';
type Props = {
    quote?: string
}

export default function QuoteBanner({ quote }: Props) {
    if (!quote) {
        return <div className='quote-banner'>
            <LoadingCircle color='primary' height='100px' width='100px' loadingText="Loading quote..."></LoadingCircle>
        </div>
    }
    return (
        <div className='quote-banner'>
            <span className='quote-text noselect'>{quote}</span>
        </div>
    )
}