/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ReactDOM from 'react-dom';
import { Deck } from './components';
import slides from './slides';
import './styles.css';

ReactDOM.render(<Deck slides={slides} />, document.getElementById('root'));
