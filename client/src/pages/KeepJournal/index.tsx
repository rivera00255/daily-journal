import Map from '../../components/Map';
import WeatherForecast, { addressUrl } from '../../components/WeatherForecast';
import StyledKeepJournal from './StyledKeepJournal';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import weatherState from '../../recoils/weather';
import { Journal } from '../../model/Journals';
import { baseUrl } from '..';

const KeepJournal = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [search, setSearch] = useState('');
  const [searchedPosition, setSearchedPosition] = useState({ lat: 0, lng: 0 });

  const weather = useRecoilValue(weatherState);
  // console.log(weather);

  const { mutate: createJournal } = useMutation(
    (journal: Pick<Journal, 'content' | 'weather' | 'location'>) => {
      return axios.post(`${baseUrl}/journals`, journal);
    },
    {
      onSuccess: (data) => {
        alert('기록 완료');
        console.log(data);
      },
      onError: (err) => console.log(err),
    }
  );

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

    // console.log(fullAddress);
    setSearch(fullAddress);
  };

  const searchLocation = () => {
    open({ onComplete: getLocation });
  };

  const { data: position } = useQuery(
    ['search', search],
    () => {
      return axios.get(`${addressUrl}/search/address.json?query=${search}`, {
        headers: { Authorization: `KakaoAK ${import.meta.env.VITE_APP_API_KEY}` },
      });
    },
    { enabled: search !== '' ? true : false }
  );

  const searchedAddress = useMemo(() => position?.data?.documents[0]?.address, [position]);

  useEffect(() => {
    if (searchedAddress) {
      setSearchedPosition({ lat: searchedAddress.y, lng: searchedAddress.x });
    }
  }, [searchedAddress]);

  return (
    <section css={StyledKeepJournal}>
      <div className="container">
        <h3>Keep a Journal</h3>
        <hr />
        <div>
          <WeatherForecast search={search} searchedPosition={searchedPosition} />
          <div className="location">
            <Map searchedPosition={searchedPosition} />
            <button onClick={searchLocation}>위치 검색</button>
          </div>
        </div>
        <div>
          <input type="text" placeholder="오늘의 기록..." ref={inputRef} />
          <button
            onClick={() => {
              if (inputRef.current) {
                createJournal({
                  content: inputRef.current.value,
                  weather: {
                    temperature: weather.temperature,
                    precipitation: weather.precipitation,
                  },
                  location: weather.location,
                });
                inputRef.current.value = '';
              }
            }}>
            기록하기
          </button>
        </div>
        <hr />
      </div>
    </section>
  );
};

export default KeepJournal;
