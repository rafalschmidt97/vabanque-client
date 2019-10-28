import React, { useState, useReducer, FC } from 'react';
import { IncrementCounter } from './actions';
import { OverviewReducer } from './reducer';
import { RouteComponentProps } from 'react-router';

type Props = RouteComponentProps & {
  initalCounter?: number;
};

const Overview: FC<Props> = ({ initalCounter = 0 }: Props) => {
  const [localCounter, setLocalCounter] = useState(initalCounter);
  const [state, dispatch] = useReducer(OverviewReducer, { counter: initalCounter });

  return (
    <>
      <div>
        <p>Local counter: {localCounter}</p>
        <button onClick={() => setLocalCounter(localCounter + 1)}>+</button>
        <button onClick={() => setLocalCounter(localCounter - 1)}>-</button>
      </div>
      <div>
        <p>Redux count: {state.counter}</p>
        <button onClick={() => dispatch(new IncrementCounter())}>+</button>
      </div>
    </>
  );
};

export default Overview;
