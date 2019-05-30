import React from 'react';
import ReactDOM from 'react-dom';
import { Deck, Slide } from './components';
import './styles.css';

const slides = [<Slide>1. Foo</Slide>, <Slide>2. Bar</Slide>, <Slide>3. Foobar</Slide>];

ReactDOM.render(<Deck slides={slides} />, document.getElementById('root'));
