import { useEffect } from 'react';
import useGeolocation from '../../hooks/useGeolocation';
import StyledMap from './StyledMap';

const { kakao }: any = window;

const Map = () => {
  const geolocation = useGeolocation();

  // 지도 생성
  const getMap = (lat: number, lng: number) => {
    const container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스

    const options = {
      //지도를 생성할 때 필요한 기본 옵션
      center: new kakao.maps.LatLng(lat, lng), //지도의 중심좌표.
      level: 3, //지도의 레벨(확대, 축소 정도)
    };

    const map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

    // 마커가 표시될 위치입니다
    const markerPosition = new kakao.maps.LatLng(lat, lng);

    // 마커를 생성합니다
    const marker = new kakao.maps.Marker({
      position: markerPosition,
    });

    // 마커가 지도 위에 표시되도록 설정합니다
    marker.setMap(map);

    return map;
  };

  // useEffect(() => {
  //   const script = document.createElement('script');
  //   script.type = 'text/javascript';
  //   script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_APP_MAP_KEY}`;
  //   script.async = true;
  //   document.body.appendChild(script);
  // }, []);

  useEffect(() => {
    const lat = geolocation.loaded ? geolocation.coords.lat : 33.450701;
    const lng = geolocation.loaded ? geolocation.coords.lng : 126.570667;
    getMap(lat, lng);
  }, [geolocation]);

  return <div id="map" css={StyledMap}></div>;
};

export default Map;
