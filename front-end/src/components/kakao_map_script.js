const { kakao } = window;

export default function KakaoMapScript() {
    const container = document.getElementById('myMap');
    const options = {
        center: new kakao.maps.LatLng(37.5518, 126.925),
        level: 4
    };
    const map = new kakao.maps.Map(container, options);
}