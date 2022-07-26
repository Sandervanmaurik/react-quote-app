import React from 'react'
import Button from '../button/button';
import "../quote-voting-item/quoteVotingItem.scss";
export default function quoteVotingItem({rating, onClick, color, isActive, icon}: any) {
  
  return (
    <div className="vote-option">
      <Button key={rating.id} id={rating.id} border='none' icon={icon} color={color} height='80%' onClick={onClick} radius='10px' width='80%' text={rating.name} isActive={isActive}></Button>
    </div>
  )
}
