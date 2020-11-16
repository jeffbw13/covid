import React from 'react';
import Stat from './Stat';

const Stats = ({stats}) => {

  return (
    <div>
    <h3>Covid stats</h3>
    {stats.map(stat => (
      <Stat stat={stat} />
    ))}
    </div>
  )
};

export default Stats;