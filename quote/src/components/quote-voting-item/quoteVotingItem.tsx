import React from 'react'
import Button from '../button/button';
import "../quote-voting-item/quoteVotingItem.scss";
export default function quoteVotingItem({props, onClick}: any) {



  return (
    <div className="vote-option">
      <Button key={props.id} id={props.id} border='none' icon={props.icon} color={props.color} height='80%' onClick={onClick} radius='5px' width='80%' text={props.name} isActive={props.isActive}></Button>
    </div>
  )
}
