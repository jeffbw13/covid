import React from 'react';

const Stat = ({stat}) => {
  function fn(num) {
    num = num ? num : 0;
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }
  return (
    <div>
    <p>Date: {stat.date}  States: {stat.states}  Positive: {fn(stat.positive)}  Negative: {fn(stat. negative)}  Pending: {fn(stat.pending)}  Hospitalized: {fn(stat.hospitalizedCurrently)}  Cumulative Deaths: {fn(stat.death)}</p>
    </div>
  );
};

export default Stat;