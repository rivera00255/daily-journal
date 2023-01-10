import { useCoordinate } from '../../hooks/useCoordinate';
import useGeolocation from '../../hooks/useGeolocation';
import StyledKeepJournal from './StyledKeepJournal';

const KeepJournal = () => {
  const geolocation = useGeolocation();
  const coords = useCoordinate('toXY', geolocation.coords.lat, geolocation.coords.lng);

  console.log(geolocation.coords);
  console.log(coords);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }
  };

  const onSuccess = (location: any) => {
    console.log(location);
  };
  const onError = (error: any) => {
    console.log(error);
  };

  return (
    <section css={StyledKeepJournal}>
      <div className="container">
        <h3>Keep a Journal</h3>
        <button onClick={getLocation}>Location</button>
        <div>
          <div>날씨</div>
          <div>위치 검색</div>
        </div>
        <div>
          <input type="text" placeholder="오늘의 기록..." />
          <button>기록하기</button>
        </div>
      </div>
    </section>
  );
};

export default KeepJournal;
