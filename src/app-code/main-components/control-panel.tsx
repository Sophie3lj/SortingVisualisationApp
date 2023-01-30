import React from 'react';
import Form from 'react-bootstrap/Form';
import './control-panel.css';

export default function ControlPanel(
  {
    onSort,
    algorithm,
    selectAlgorithm,
    speed,
    selectSpeed,
    range,
    selectRange,
  } : {
    onSort : () => void;
    algorithm : number;
    selectAlgorithm : (e : React.ChangeEvent<HTMLSelectElement>) => void;
    speed : number;
    selectSpeed : (e : React.ChangeEvent<HTMLSelectElement>) => void;
    range : number;
    selectRange : (e : React.ChangeEvent<any>) => void;
  }
) : JSX.Element  {
  return (
    <div className={'control-panel'}>
      <div className={'panel-col'}>
          <Form.Label className={'label'}>
            Sorting Algorithm
          </Form.Label>
          <Form.Select value={algorithm} onChange={selectAlgorithm}>
            <option value={1}>Selection Sort</option>
            <option value={2}>Bubble Sort</option>
            <option value={3}>Insertion Sort</option>
            <option value={4}>Merge Sort</option>
            <option value={5}>Quick Sort</option>
          </Form.Select>
      </div>
      <div className={'panel-col'}>
          <Form.Label className={'label'}>Number of Values</Form.Label>
          <Form.Control type="number" className={'number-input'} max={250} value={range} onChange={selectRange}></Form.Control>
      </div>
      <div className={'panel-col'}>
          <Form.Label className={'label'}>Speed</Form.Label>
          <Form.Select value={speed} onChange={selectSpeed}>
            <option value={1000}>Very Slow</option>
            <option value={100}>Slow</option>
            <option value={10}>Fast</option>
            <option value={1}>Very Fast</option>
          </Form.Select>
      </div>
      <div className={'panel-col'}>
          <button className={'button label'} onClick={onSort}>Sort!</button>
      </div>
    </div>
  );
}
