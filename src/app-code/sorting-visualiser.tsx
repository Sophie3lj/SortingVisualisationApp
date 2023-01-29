import React from 'react';
import { useState } from 'react';
import ControlPanel from './main-components/control-panel';
import Header from './main-components/header';
import SortView from './main-components/sort-view';
import './main.css';

export default function SortingVisualiser() : JSX.Element  {
  // create range array
  const arrayRange = (n : number) => {
    let array : Array<number> = [];

    for (let i = 1; i <= n; i++) {
      array.push(i);
    }

    return array;
  }

  // shuffle range array
  const shuffleArray = (array : Array<number>) => {
    let randomIndex;

    for (let i = 0; i < array.length; i++) {
      randomIndex = Math.floor(Math.random() * array.length);

      [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
    }

    return array;
  }

  const [updateView, setUpdateView] = useState<boolean>(false);
  const [animations, setAnimations] = useState<Array<{array : Array<number>, current : number, compare : number}>>([]);
  const [algorithm, setAlgorithm] = useState<number>(1);
  const [numValues, setNumValues] = useState<number>(100);
  const [speed, setSpeed] = useState<number>(1);

  // selection sort algorithm
  const selectionSort = (array : Array<number>) => {
    let an : Array<{array : Array<number>, current : number, compare : number}> = [];
    let current = 0;
    let compare = 0;

    an.push({
      current : -1,
      compare : -1,
      array : Array.from(array),
    });

    for (let i = 0; i < array.length; i++) {
      current = i;
      an.push({
        current : current,
        compare : compare,
        array : Array.from(array),
      });
      for (let j = i+1; j < array.length; j++) {
        compare = j;
        an.push({
          current : current,
          compare : compare,
          array : Array.from(array),
        });
        
        if (array[compare] < array[current]) {
          current = compare;
          an.push({
            current : current,
            compare : compare,
            array : Array.from(array),
          });
        }
      }

      [array[i], array[current]] = [array[current], array[i]];
      an.push({
        current : current,
        compare : compare,
        array : Array.from(array),
      });
    }

    an.push({
      current : -1,
      compare : -1,
      array : Array.from(array),
    });

    setAnimations(an);
    setUpdateView(!updateView);
  }

  // bubble sort algorithm
  const bubbleSort = (array : Array<number>) => {
    let an : Array<{array : Array<number>, current : number, compare : number}> = [];
    let current = 0;
    let compare = 0;

    an.push({
      current : -1,
      compare : -1,
      array : Array.from(array),
    });

    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array.length - i; j++) {
        current = j;
        compare = j+1;
        an.push({
          current : current,
          compare : compare,
          array : Array.from(array),
        });
        if (array[current] > array[compare]) {
          [array[current], array[compare]] = [array[compare], array[current]];
          an.push({
            current : compare,
            compare : current,
            array : Array.from(array),
          });
        }
      }
    }

    an.push({
      current : -1,
      compare : -1,
      array : Array.from(array),
    });

    setAnimations(an);
    setUpdateView(!updateView);
  }

  // insertion sort algorithm
  const insertionSort = (array : Array<number>) => {
    let an : Array<{array : Array<number>, current : number, compare : number}> = [];
    let current = 0;
    let compare = 0;

    an.push({
      current : -1,
      compare : -1,
      array : Array.from(array),
    });

    for (let i = 1; i < array.length; i++) {
      current = i;
      compare = i - 1;

      an.push({
        current : current,
        compare : compare,
        array : Array.from(array),
      });
      
      while (array[current] < array[compare]) {
        an.push({
          current : current,
          compare : compare,
          array : Array.from(array),
        });
        [array[current], array[compare]] = [array[compare], array[current]];
        an.push({
          current : compare,
          compare : current,
          array : Array.from(array),
        });
        current--;
        compare = current - 1;
      }
    }

    an.push({
      current : -1,
      compare : -1,
      array : Array.from(array),
    });

    setAnimations(an);
    setUpdateView(!updateView);
  }

  // merge sort algorithm
  const mergeSortStart = (array : Array<number>) => {
    let an : Array<{array : Array<number>, current : number, compare : number}> = [];
    let current = 0;
    let compare = 0;

    an.push({
      current : -1,
      compare : -1,
      array : Array.from(array),
    });
    
    mergeSort(array, 0, array.length-1, an);

    an.push({
      current : -1,
      compare : -1,
      array : Array.from(array),
    });

    setAnimations(an);
    setUpdateView(!updateView);
  }

  const mergeSort = (array : Array<number>, left : number, right : number, an : Array<{array : Array<number>, current : number, compare : number}>) => {
    if (left >= right) return;

    const mid = Math.floor((left + right) / 2);

    mergeSort(array, left, mid, an);
    mergeSort(array, mid+1, right, an);
    merge(array, left, mid, right, an);
  }

  const merge = (array : Array<number>, left : number, mid : number, right : number, an : Array<{array : Array<number>, current : number, compare : number}>) => {
    let leftArray : Array<number> = new Array(mid - left);
    let rightArray : Array<number> = new Array(right - (mid + 1));

    for (let i = left; i <= mid; i++) {
      leftArray[i-left] = array[i];
      array[i] = 0;
    }

    for (let i = mid+1; i <= right; i++) {
      rightArray[i-(mid+1)] = array[i];
      array[i] = 0;
    }

    an.push({
      current : -1,
      compare : -1,
      array : Array.from(array),
    });

    let l = 0;
    let r = 0;

    for (let i = left; i <= right; i++) {
      if (l < leftArray.length && r < rightArray.length && leftArray[l] < rightArray[r]) {
        array[i] = leftArray[l];
        l++;
      }
      else if (l < leftArray.length && r < rightArray.length && leftArray[l] > rightArray[r]) {
        array[i] = rightArray[r];
        r++
      }
      else if (l < leftArray.length && r >= rightArray.length) {
        array[i] = leftArray[l];
        l++;
      }
      else if (l >= leftArray.length && r < rightArray.length) {
        array[i] = rightArray[r];
        r++;
      }

      an.push({
        current : i,
        compare : -1,
        array : Array.from(array),
      });

      console.log(Array.from(array));
    }
  }

  const sort = () => {
    let array = arrayRange(numValues);
    array = shuffleArray(array);

    if (algorithm == 1) selectionSort(array);
    else if (algorithm == 2) bubbleSort(array);
    else if (algorithm == 3) insertionSort(array);
    else if (algorithm == 4) mergeSortStart(array);
  }

  return (
    <div className={'main'}>
      <Header />
      <SortView animations={animations} speed={speed} updated={updateView} />
      <ControlPanel 
        onSort={sort} 
        algorithm={algorithm}
        selectAlgorithm={(e) => {
          setAlgorithm(parseInt(e.target.value));
        }}
        speed={speed}
        selectSpeed={(e) => {
          setSpeed(parseInt(e.target.value));
        }}
        range={numValues}
        selectRange={(e) => {
          if (e.target.value <= 250) setNumValues(e.target.value);
          else setNumValues(250);
        }}/>
    </div>
  );
}