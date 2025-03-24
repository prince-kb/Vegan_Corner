import React from 'react'
import { showDate, showTime } from '../../utils/datetime'

const OrderDetails = ({order}) => {
    // console.log(order)
  return (
    <div>
        <h3>Order Date : <span className='font-semibold'>{showDate(order?.date)} at {showTime(order?.date)}</span></h3>
        
    </div>
  )
}

export default OrderDetails