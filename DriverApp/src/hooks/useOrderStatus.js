import React, {useState, useEffect} from 'react';

export default function useOrderStatus(data) {
  const [order, setOrder] = useState(data);

  // add websocket initializer for receiving order

  return order;
}
