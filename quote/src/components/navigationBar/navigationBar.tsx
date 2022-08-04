import { render } from '@testing-library/react';
import React, { useEffect, useState } from 'react'
import '../navigationBar/navigationBar.scss';

export default function NavigationBar({ quotes, clickHandler }: any) {
    return (
        <div className='toolbar-container'>
            {
                quotes?.map((item: any) => {
                    return (<div className={`toolbar-item ${item.selected ? "selected" : ""} ${item.hasVoted ? "voted" : ""}`} key={item.id} onClick={() => clickHandler(item.id)}><span>{item.id}</span></div>)
                })
            }
        </div>

    )
}