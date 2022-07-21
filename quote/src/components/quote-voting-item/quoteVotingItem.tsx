import React from 'react'
import "../quote-voting-item/quoteVotingItem.css";
export default function quoteVotingItem({option}: any) {
  return (
    <div className="vote-option">{option.name}</div>
  )
}
