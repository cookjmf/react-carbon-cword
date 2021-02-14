import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import Game from './game.js';

console.log('index : START : -------------------------------------------->');
console.log('index : START : ReactDOM.render Game ----------------------->');
console.log('index : START : -------------------------------------------->');

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

