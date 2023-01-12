import Map from '../../components/Map';
import WeatherForecast from '../../components/WeatherForecast';
import StyledKeepJournal from './StyledKeepJournal';
import { useDaumPostcodePopup } from 'react-daum-postcode';

const KeepJournal = () => {
  const open = useDaumPostcodePopup('//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js');

  const getLocation = (data: any) => {
    let fullAddress = data.address;
    // let extraAddress = '';

    // if (data.addressType === 'R') {
    //   if (data.bname !== '') {
    //     extraAddress += data.bname;
    //   }
    //   if (data.buildingName !== '') {
    //     extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
    //   }
    //   fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    // }

    console.log(fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
  };

  const searchLocation = () => {
    open({ onComplete: getLocation });
  };

  return (
    <section css={StyledKeepJournal}>
      <div className="container">
        <h3>Keep a Journal</h3>
        <div>
          <WeatherForecast />
          {/* <div style={{ position: 'relative' }}>
            <Map />
            <button onClick={searchLocation} style={{ position: 'absolute', top: '0', right: '10px', zIndex: '1' }}>
              위치 검색
            </button>
          </div> */}
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
