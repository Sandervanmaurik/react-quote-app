import React from 'react'
import Button from '../button/button';
import "../quote-voting-item/quoteVotingItem.scss";
export default function quoteVotingItem({props}: any) {
  return (
    <div className="vote-option">
      <Button key={props.id} border='none' icon={props.icon} color={props.color} height='80%' onClick={props.onClick} radius='5px' width='80%' boxShadow="-5px -5px 9px rgba(255,255,255,0.45), 5px 5px 9px rgba(94,104,121,0.3)" text={props.name}></Button>
    </div>
  )
}
