import React, { useEffect } from 'react'
import KakaoMapScript from './kakao_map_script';

export default function MapContainer() {

	useEffect(()=> { // 앱이 빌드될 때 실행하기 위해 useEffect() 사용
		KakaoMapScript();
	}, []); // 두번째 인자로 []를 주면 처음 렌더링될 때 한번만 띄움

	return (
		<div id='myMap'style={{
			width: '100vw',
			height: '100vh'
		}}></div>
	);
}