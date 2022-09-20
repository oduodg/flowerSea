import React , { useState } from "react";
// import MapContainer from "./map_container";
import axios from "axios";
import './kakao_map_script.css'
const { kakao } = window;

export default function KakaoMapScript(props) {
	var name = "";
	const mapContainer = document.getElementById('map'), // 지도를 표시할 div 
		mapOption = {
			center: new kakao.maps.LatLng(37.5518, 126.925), // 지도의 중심좌표(홍익대학교)
			level: 4 // 지도의 확대 레벨
		};

	var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다
	// var shoplist = [];
	// 꽃집 위치 받아오기
	const domain = "http://3.38.97.195/";
	// const domain = "http://127.0.0.1:8000/";
	
	const getData = async () => {
		try {
			// setName("string");
			// console.log("try 안");
			const res = await axios.get(domain + "api/flowershop/");
			let flowerShop = res.data;
			//console.log(flowerShop);

			// 마커 이미지의 이미지 주소입니다
			var imageSrc = process.env.PUBLIC_URL + `/images/flowermarker.png`;
			for (let i = 0; i < flowerShop.length; i++) {
				// 마커 이미지의 이미지 크기 입니다
				var imageSize = new kakao.maps.Size(45, 40);


				// 마커 이미지를 생성합니다
				var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

				// 마커를 생성합니다
				var marker = new kakao.maps.Marker({
					map: map, // 마커를 표시할 지도
					position: new kakao.maps.LatLng(flowerShop[i].y, flowerShop[i].x), // 마커를 표시할 위치
					title: flowerShop[i].shopName, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
					image: markerImage, // 마커 이미지 
				});


				// 마커에 표시할 커스텀오버레이 생성합니다 
				var customOverlay = new kakao.maps.CustomOverlay({
					map: map,
					position: new kakao.maps.LatLng(flowerShop[i].y, flowerShop[i].x), 
					content: `<div class="info-title">${flowerShop[i].shopName}</div>`,
					// value : flowerShop[i].shopName,
					yAnchor: 2.5
					
				});
				


				// // 마커에 마우스오버 이벤트를 등록합니다
				// kakao.maps.event.addListener(marker, 'mouseover', function() {
				// 	// 마커에 마우스오버 이벤트가 발생하면 인포윈도우를 마커위에 표시합니다
				// 	customOverlay.open(map, marker);

				// });

				// // 마커에 마우스아웃 이벤트를 등록합니다
				// kakao.maps.event.addListener(marker, 'mouseout', function() {
				// 	customOverlay.close();
				// });

			

				(function (marker, customOverlay) {
					// kakao.maps.event.addListener(marker, 'mouseover', function () {
					// 	customOverlay.open(map, marker);
					// });

					// kakao.maps.event.addListener(marker, 'mouseout', function () {
					// 	customOverlay.close();
					// });
					kakao.maps.event.addListener(marker, 'click', function () {
						// e.preventDefault();
						// console.log(marker.Gb);
						props.setName(marker.Gb);
						props.name=marker.Gb;
						// console.log(props.name);

					});
				})(marker, customOverlay);

			}
		} catch (err) {
			console.log("error");
		}
	};

	getData();
};


