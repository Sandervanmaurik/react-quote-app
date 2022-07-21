import React from 'react';
import { useState } from 'react';
import { FaQuestion } from 'react-icons/fa';
import { ImSleepy } from 'react-icons/im';
import { BiLaugh } from 'react-icons/bi';
import { GiTeamIdea } from 'react-icons/gi';

import QuoteVotingItem from '../quote-voting-item/quoteVotingItem';
import "./quoteVotingBox.scss";
export default function QuoteVotingBox() {

    interface VotingItemProps {
        id: string;
        name: string;
        color: string;
    }
    const [options, setOptions] = useState<VotingItemProps[]>(() => [
        { name: "Boring", id: "1", color: "#F1F2F6", icon: (<ImSleepy color="#c9ccd6" fontSize="30px"/>)},
        { name: "I don't get it", id: "2", color: "#EFEBFF", icon: (<FaQuestion color="#9D85FF" fontSize="30px"/>)},
        { name: 'Funny', id: "3", color: "#D6EBE5", icon: (<BiLaugh color="#69B59E" fontSize="30px"/>) },
        { name: 'Inspiring', id: "4", color: "#FEF3D7", icon: (<GiTeamIdea color="#FAC94C" fontSize="30px"/>) }]);

    return (
        <div className='quote-vote-box'>
            {options.map(option => {
                return <QuoteVotingItem key={option.id} props={option}></QuoteVotingItem>
            })}
        </div>
    );
}