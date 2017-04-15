import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from '../node_modules/material-ui/styles/MuiThemeProvider';
import TodoApp from './js/TodoApp';
import './index.css';

const App = () => (
  <MuiThemeProvider>
    <TodoApp />
  </MuiThemeProvider>
);

ReactDOM.render(
  <App />,
  document.getElementById('root'),
);
