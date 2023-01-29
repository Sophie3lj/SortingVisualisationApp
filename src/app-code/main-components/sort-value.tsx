import React from 'react'
import './sort-view.css';

export default function SortValue(
    {
        number,
        height,
        color,
    } : {
        number : number;
        height : number;
        color : string;
    }
) : JSX.Element {
  return (
    <div key={number} className={'sort-value'} style={{height : `${height}%`, backgroundColor : color}}></div>
  )
}
