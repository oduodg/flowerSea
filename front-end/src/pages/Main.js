import React from 'react';
import MapContainer from '../components/map_container';
import Sidebar from '../components/sidebar';

export default function Main() {
  return (
    <>
      {/* <h1>메인 페이지</h1> */}
      <Sidebar />
      <MapContainer />
    </>
  )
}
