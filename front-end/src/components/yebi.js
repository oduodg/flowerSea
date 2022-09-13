import axios from "axios";
import "./kakao_map_script.css";

const { kakao } = window;

export default function KakaoMapScript() {
	const mapContainer = document.getElementById('map'), // 지도를 표시할 div 
		mapOption = {
			center: new kakao.maps.LatLng(37.5518, 126.925), // 지도의 중심좌표(홍익대학교)
			level: 3 // 지도의 확대 레벨
		};

	var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

	// 꽃집 위치 받아오기
	const domain = "http://127.0.0.1:8000/";

	const getData = async () => {
		try {
			const res = await axios.get(domain + "api/flowershop/");
			let flowerShop = res.data;
			//console.log(flowerShop);

			// 마커 이미지의 이미지 주소입니다
			var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
			for (let i = 0; i < flowerShop.length; i++) {
				// 마커 이미지의 이미지 크기 입니다
				var imageSize = new kakao.maps.Size(24, 35);

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
					yAnchor: 2.5
					
				});
				

				(function (marker, customOverlay) {
					kakao.maps.event.addListener(marker, 'mouseover', function () {
						customOverlay.open(map, marker);
					});

					kakao.maps.event.addListener(marker, 'mouseout', function () {
						customOverlay.close();
					});
				})(marker, customOverlay);
			}

		} catch (err) {
			console.log("error");
		}
	};

	getData();
};

