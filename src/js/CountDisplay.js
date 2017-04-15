import React, { Component } from 'react';

function CountDisplay(props) {
  const { finished, unfinished } = props.count;
  const strFinished = `${finished} complete`;
  const strUnfinished = `${unfinished} left`;
  const style = {
    color: '#BDBDBD',
  };
  return (
    <div style={style}>
      {strFinished}, {strUnfinished}
    </div>
  );
}

export default CountDisplay;
