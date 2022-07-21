import { useState } from 'react';

export default function QuoteVotingBox() {
    const [options, setOptions] = useState([{ name: "Boring", id: "1" }, { name: "I don't get it", id: "2" }, { name: 'Funny', id: "3" }, { name: 'Inspiring', id: "4" }]);

    return (
        <div className='quote-vote-box'>
            {options.map(option => {
                return <div key={option.id} className='quote-vote-item'> <span>{option.name}</span></div>
            })}
        </div>
    );
}