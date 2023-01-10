import { useEffect, useState } from 'react';

const useGeolocation = () => {
  const [location, setLocation] = useState({
    loaded: false,
    coords: { lat: 0, lng: 0 },
  });

  const onSuccess = (location: any) => {
    setLocation({
      loaded: true,
      coords: {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      },
    });
  };

  const onError = (error: any) => {
    setLocation({ loaded: true, coords: { lat: 0, lng: 0 } });
    alert('위치 정보를 찾을 수 없습니다.');
  };

  useEffect(() => {
    if (!navigator.geolocation) console.log('Geolocation not supported...');
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }, []);

  return location;
};

export default useGeolocation;
