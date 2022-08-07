import React from 'react'
import '../quote-banner/quoteBanner.scss'
type Props = {
    quote?: string
}

export default function QuoteBanner({ quote }: Props) {
    return (
        <div className='quote-banner'>
            <span className='quote-text noselect'>{quote}</span>
        </div>
    )
}