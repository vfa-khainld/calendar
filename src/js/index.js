import React from 'react';
import ReactDOM from 'react-dom';
import Calendar from './calendar'; 


const data = [
  {
    year: 2017,
    month: 5,
    day: 1,
    fee_pattern_no: 1000,
    status: 'available'
  },
  {
    year: 2017,
    month: 5,
    day: 2,
    fee_pattern_no: 1200,
    status: 'partiallyAvailable'
  },
  {
    year: 2017,
    month: 5,
    day: 3,
    fee_pattern_no: 2410,
    status: 'request'
  },
  {
    year: 2017,
    month: 5,
    day: 4,
    fee_pattern_no: 51000,
    status: 'closed'
  }
];


ReactDOM.render(<Calendar store={data}/>, document.getElementById('root'));