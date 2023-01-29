import React from 'react'
import './sort-view.css';

export default function SortValue(
    {
        index,
        height,
        color,
    } : {
        index : number;
        height : number;
        color : string;
    }
) : JSX.Element {
  return (
    <div key={index} className={'sort-value'} style={{height : `${height}%`, backgroundColor : color}}></div>
  )
}
