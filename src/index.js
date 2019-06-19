import React from 'react';
import ReactDOM from 'react-dom';
import { Deck } from './components';
import { sampleSlides } from './slides';
import './styles.css';

ReactDOM.render(<Deck slides={sampleSlides} />, document.getElementById('root'));
