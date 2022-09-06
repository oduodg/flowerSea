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
					image: markerImage // 마커 이미지 
				});

				// 마커에 표시할 인포윈도우를 생성합니다 
				var infowindow = new kakao.maps.InfoWindow({
					content: `<span class="info-title">${flowerShop[i].shopName}</span>` // 인포윈도우에 표시할 내용
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
				})(marker, infowindow);
			}

		} catch (err) {
			console.log("error");
		}
	};

	getData();
	var infoTitle = document.querySelectorAll('.info-title');
	infoTitle.forEach(function(e) {
	    var w = e.offsetWidth + 10;
	    var ml = w/2;
	    e.parentElement.style.top = "82px";
	    e.parentElement.style.left = "50%";
	    e.parentElement.style.marginLeft = -ml+"px";
	    e.parentElement.style.width = w+"px";
	    e.parentElement.previousSibling.style.display = "none";
	    e.parentElement.parentElement.style.border = "0px";
	    e.parentElement.parentElement.style.background = "unset";
	});

};