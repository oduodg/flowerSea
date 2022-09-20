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
			level: 1 // 지도의 확대 레벨
		};

	var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다
	// var shoplist = [];
	// 꽃집 위치 받아오기
	const domain = "http://127.0.0.1:8000/";
	
	const getData = async () => {
		try {
			// setName("string");
			console.log("try 안");
			const res = await axios.get(domain + "api/flowershop/");
			let flowerShop = res.data;
			console.log(flowerShop);
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
					map : map,
					position: new kakao.maps.LatLng(flowerShop[i].y, flowerShop[i].x), // 마커를 표시할 위치
					title: flowerShop[i].shopName, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
					image: markerImage, // 마커 이미지 
				});
				// marker.setClickable(true);
				
				// var iwContent = `<div class="info-title">${flowerShop[i].shopName}</div>`;
				
				var	content = '<div class="wrap">' + 
							'    <div class="info">' + 
							`		<div class="title">${flowerShop[i].shopName}` + 
							'            <div class="close" onclick="closeOverlay()" title="닫기"></div>' + 
							'		</div>' + 
							'        <div class="body">' + 
							'            <div class="img">' +
							'                <img src="https://cfile181.uf.daum.net/image/250649365602043421936D" width="73" height="70">' +
							'           </div>' + 
							'            <div class="desc">' + 
							`                <div class="ellipsis">${flowerShop[i].location}</div>` + 
							`                <div class="openHours">${flowerShop[i].openHours}</div>` + 
							`                <div class="jibun ellipsis">${flowerShop[i].phoneNum}</div>` + 
							'                <div classname="rate"><a href="/Rate" target="_blank" class="link">****</a></div>' + 
							
							'                <div ><a href="" target="_blank" class="link">구매 후기 / 가게 평점</a></div>' + 
							'            </div>' + 
							'        </div>' + 
							'    </div>' +    
							'</div>';

						// <div className="rgbt">
						// 	<Link to="/mypageedit">
						// 	  <button className="rgbutton">수정하기</button>
						// 	</Link>
						// </div>
				
					

				// 마커에 표시할 커스텀오버레이 생성합니다 
				// var customOverlay = new kakao.maps.CustomOverlay({
				// 	position: new kakao.maps.LatLng(flowerShop[i].y, flowerShop[i].x),
				// });

				var overlay = new kakao.maps.CustomOverlay({
					content: content,
					map: map,
					position: marker.getPosition()
				});

				
				kakao.maps.event.addListener(marker, 'click', function() {
					overlay.setMap(map);
				});
				
				// 커스텀 오버레이를 닫기 위해 호출되는 함수입니다 
				function closeOverlay() {
					overlay.setMap(null);     
				}


			

				(function (marker, overlay) {
					kakao.maps.event.addListener(marker, 'click', function () {
						console.log(marker.Gb);
						props.setName(marker.Gb);
						props.name=marker.Gb;
						console.log(props.name);

					});
				})(marker, overlay);

			}
		} catch (err) {
			console.log("error");
		}
	};

	getData();
};






