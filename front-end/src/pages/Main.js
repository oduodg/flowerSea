import React, { useState } from 'react';
import MapContainer from '../components/map_container';
import Sidebar from '../components/sidebar';

export default function Main() {
  const [shop, setShop] = useState(null);
  // const parentFunction = (x) => {
  //   setShop(x);
  //   console.log(x);
  // };
  console.log("shop is ", shop);
  
  return (
    <>
      <Sidebar shop={shop} setShop = {setShop}/>
      <MapContainer shop={shop} setShop = {setShop}/>
    </>
  )
}
