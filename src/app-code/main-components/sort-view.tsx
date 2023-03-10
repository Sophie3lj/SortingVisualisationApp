import React, { useEffect, useMemo } from 'react';
import { useState } from 'react';
import SortValue from './sort-value';
import './sort-view.css';

export default function SortView(
  {
    updated,
    animations,
    speed,
    setAnimating,
  } : {
    updated : boolean;
    animations : Array<{array : Array<number>, current : number, compare : number, compare2? : number}>;
    speed : number;
    setAnimating : (val : boolean) => void;
  }
) : JSX.Element {

  const [ann, setAnn] = useState<{array : Array<number>, current : number, compare : number, compare2? : number}>({
    array : [],
    current : 0,
    compare : 0,
  });

  useEffect(() => {
    for (let i = 0; i < animations.length; i++) {
      setAnimating(true);
      setTimeout(() => {
        setAnn(animations[i]);
        if (i == animations.length-1) setAnimating(false);
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
          else if (index == ann.compare) {
            color = '#fbd460';
          }
          else if (ann.compare2 != undefined && index == ann.compare2) {
            color = '#fbfb60';
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
