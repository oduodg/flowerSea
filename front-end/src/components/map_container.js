import React, { useEffect, useState } from 'react'
import KakaoMapScript from './kakao_map_script';

export default function MapContainer({shopname, setShopName}) {
	const [name, setName] = useState(null);
	useEffect(()=> { // 앱이 빌드될 때 실행하기 위해 useEffect() 사용
		// <KakaoMapScript />
		KakaoMapScript({name, setName});
	}, []); // 두번째 인자로 []를 주면 처음 렌더링될 때 한번만 띄움
	// console.log(name);
	setShopName(name);
	return (
		<div id='map'style={{
			width: '100vw',
			height: '100vh'
		}}></div>
		
	);
}

