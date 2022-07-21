import React from 'react';
import { useState } from 'react';
import QuoteVotingItem from '../quote-voting-item/quoteVotingItem';
import "./quoteVotingBox.css";
export default function QuoteVotingBox() {
    const [options, setOptions] = useState(() => [{ name: "Boring", id: "1" }, { name: "I don't get it", id: "2" }, { name: 'Funny', id: "3" }, { name: 'Inspiring', id: "4" }]);

    
    return (
        <div className='quote-vote-box'>
            {options.map(option => {
                return <QuoteVotingItem key={option.id} option={option}></QuoteVotingItem>
            })}
        </div>
    );
}