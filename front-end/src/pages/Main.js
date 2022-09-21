import React, { useState } from 'react';
import MapContainer from '../components/map_container';
import Sidebar from '../components/sidebar';

export default function Main() {
  const [shopname, setShopName] = useState(null);
  
  return (
    <>
      <Sidebar shopname={shopname} setShopName = {setShopName}/>
      <MapContainer shopname={shopname} setShopName = {setShopName}/>
    </>
  )
}
