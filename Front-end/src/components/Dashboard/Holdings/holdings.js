import React from 'react'
import Holding from './Holding/Holding';
import {useSelector} from 'react-redux'; //to retrieve the data from the store in redux


const Holdings = () => {
  const holdings = useSelector(state => state.holdings);

  console.log(holdings);

  return (
    <>
    {holdings.map( holding => (
      <Holding holding={holding}></Holding>
    ))

    }
    </>
  )
}

export default Holdings
