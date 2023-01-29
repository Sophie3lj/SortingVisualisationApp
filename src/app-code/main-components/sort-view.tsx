import React, { useEffect, useMemo } from 'react';
import { useState } from 'react';
import SortValue from './sort-value';
import './sort-view.css';

export default function SortView(
  {
    updated,
    animations,
    speed,
  } : {
    updated : boolean;
    animations : Array<{array : Array<number>, current : number, compare : number}>;
    speed : number;
  }
) : JSX.Element {

  const [ann, setAnn] = useState<{array : Array<number>, current : number, compare : number}>({
    array : [],
    current : 0,
    compare : 0,
  });

  useEffect(() => {
    console.log(animations);
    for (let i = 0; i < animations.length; i++) {
      setTimeout(() => {
        console.log(animations[i].array);
        setAnn(animations[i]);
      }, (speed * (i + 1)));
    }
  }, [updated, animations]);

  return (
    <div className={'sort-view'}>
      {(ann.array.length > 0) ? ann.array.map((a, index) => {
          const height = (a/ann.array.length) * 100;
          let color = '#61dafb';
          
          if (a == index + 1) {
            color = '#60fb87';
          }
  
          if (index == ann.current) {
            color = '#fb6060';
          }
  
          if (index == ann.compare) {
            color = '#fbd460';
          }
          
          return (
            <SortValue index={index} height={height} color={color} key={index} />
          );
        }) :
        <div className='welcome-container'>
          <div className='welcome'>
            <div className={'welcome-heading'}>Welcome!</div>
            <div className={'welcome-text'}>
              Select the algorithm, value range and speed and watch it sort!
            </div>
          </div>
        </div>}
    </div>
  );
}
