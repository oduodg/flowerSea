import React , { useState } from "react";
// import MapContainer from "./map_container";
import axios from "axios";

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
	
	const getData = async () => {
		try {
			// setName("string");
			console.log("try 안");
			const res = await axios.get(domain + "api/flowershop/");
			let flowerShop = res.data;
			//console.log(flowerShop);

			// 마커 이미지의 이미지 주소입니다
			var imageSrc = "/images/marker.png";
			for (let i = 0; i < flowerShop.length; i++) {
				// 마커 이미지의 이미지 크기 입니다
				var imageSize = new kakao.maps.Size(35, 45);

				// 마커 이미지를 생성합니다    
				var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

				// 마커를 생성합니다
				var marker = new kakao.maps.Marker({
					map: map, // 마커를 표시할 지도
					position: new kakao.maps.LatLng(flowerShop[i].y, flowerShop[i].x), // 마커를 표시할 위치
					title: flowerShop[i].shopName, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
					image: markerImage // 마커 이미지 
				});

				// 마커에 표시할 인포윈도우를 생성합니다 
				var infowindow = new kakao.maps.InfoWindow({
					content: flowerShop[i].shopName // 인포윈도우에 표시할 내용
				});

				// 마커에 이벤트를 등록하는 함수 만들고 즉시 호출하여 클로저를 만듭니다
				// 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록됩니다
				(function (marker, infowindow) {
					// 마커에 mouseover 이벤트를 등록하고 마우스 오버 시 인포윈도우를 표시합니다 
					kakao.maps.event.addListener(marker, 'mouseover', function () {
						infowindow.open(map, marker);
					});

					// 마커에 mouseout 이벤트를 등록하고 마우스 아웃 시 인포윈도우를 닫습니다
					kakao.maps.event.addListener(marker, 'mouseout', function () {
						infowindow.close();
					});
					kakao.maps.event.addListener(marker, 'click', function() {
						// 마커 위에 인포윈도우를 표시합니다
						props.setName(infowindow.cc);
						props.name = infowindow.cc;
						console.log(props.name);
				  });
				})(marker, infowindow);
			}
		} catch (err) {
			console.log("error");
		}
	};

	getData();
}