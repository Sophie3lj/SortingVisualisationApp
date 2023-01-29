import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartSimple } from '@fortawesome/free-solid-svg-icons';
import { faGithubSquare } from '@fortawesome/free-brands-svg-icons' 
import React from 'react';
import './header.css'

export default function Header() : JSX.Element  {
  return (
    <div className={'header'}>
      <div className={'header-left'}>
        <FontAwesomeIcon icon={faChartSimple} className={'heading-icon'}/>
        <span className={'heading-text'}>Sorting Visualiser</span>
      </div>
      <div className={'header-right'}>
        <span className={'sub-heading-text'}>View the code on GitHub...</span>
        <FontAwesomeIcon icon={faGithubSquare} className={'sub-heading-icon'}/>
      </div>
    </div>
  );
}
