import Map from '../../components/Map';
import WeatherForecast, { addressUrl } from '../../components/WeatherForecast';
import StyledKeepJournal from './StyledKeepJournal';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import weatherState from '../../recoils/weather';
import { Journal } from '../../model/Journals';
import { baseUrl } from '..';
import api from '../../utilities/api';
import { useNavigate } from 'react-router-dom';
import authState from '../../recoils/auth';

const KeepJournal = () => {
  const user = useRecoilValue(authState);

  const inputRef = useRef<HTMLTextAreaElement>(null);

  const [search, setSearch] = useState('');
  const [searchedPosition, setSearchedPosition] = useState({ lat: 0, lng: 0 });

  const weather = useRecoilValue(weatherState);
  // console.log(weather);

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { mutate: createJournal } = useMutation(
    (journal: Pick<Journal, 'content' | 'writer' | 'weather' | 'location'>) => {
      return api.post(`${baseUrl}/journals`, journal);
    },
    {
      onSuccess: () => {
        alert('기록 완료');
        queryClient.invalidateQueries(['journals']);
        navigate('/');
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
          {user === null ? (
            <div>로그인 후 이용해주세요.</div>
          ) : (
            <>
              <textarea placeholder="오늘의 기록..." ref={inputRef} />
              <button
                onClick={() => {
                  if (inputRef.current && inputRef.current.value !== '') {
                    createJournal({
                      content: inputRef.current.value,
                      writer: user.user,
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
            </>
          )}
        </div>
        <hr />
      </div>
    </section>
  );
};

export default KeepJournal;
