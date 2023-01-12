import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';
import { useCoordinate } from '../../hooks/useCoordinate';
import useGeolocation from '../../hooks/useGeolocation';
import StyledWeatherForecast from './StyledWeatherForecast';

type WeatherResponse = {
  baseDate: string;
  baseTime: string;
  category: string;
  nx: number;
  ny: number;
  obsrValue: string;
};

const WeatherForecast = () => {
  const baseUrl = import.meta.env.VITE_APP_API_URL;
  const addressUrl = import.meta.env.VITE_APP_ADDR_URL;

  const weatherCodeList = [
    { code: 'T1H', name: '기온', symbol: '℃' },
    { code: 'RN1', name: '강수량', symbol: 'mm' },
    { code: 'REH', name: '습도', symbol: '%' },
    { code: 'WSD', name: '풍속', symbol: 'm/s' },
  ];

  const geolocation = useGeolocation(); // 현재 위치
  // const coords = useCoordinate('toXY', geolocation.coords.lat, geolocation.coords.lng);
  const now = new Date();
  // console.log(geolocation.coords);

  const [current, setCurrent] = useState({ baseDate: '', baseTime: '', nx: 0, ny: 0 });
  const [enable, setEnable] = useState(true);
  const [weatherReport, setWeatherReport] = useState(new Map());

  const getDateTime = () => {
    const today = now.toLocaleDateString().replaceAll('.', '').replaceAll(' ', '');
    const date = today.length < 8 ? ''.concat(today.substring(0, 4), '0', today.substring(4)) : today;
    const min = now.toTimeString().substring(3, 5);
    const time =
      parseInt(min) > 40 ? now.toTimeString().substring(0, 2) : parseInt(now.toTimeString().substring(0, 2)) - 1;
    setCurrent((prev) => ({ ...prev, baseDate: date, baseTime: time.toString().padStart(2, '0') }));
  };

  const { data: address } = useQuery(
    ['address', geolocation.coords.lat, geolocation.coords.lng],
    () => {
      return axios.get(`${addressUrl}?x=${geolocation.coords.lng}&y=${geolocation.coords.lat}`, {
        headers: { Authorization: `KakaoAK ${import.meta.env.VITE_APP_API_KEY}` },
      });
    },
    { enabled: enable }
  );
  // console.log(address);

  const currentAddress = useMemo(() => address?.data?.documents[0]?.address, [address]);
  // console.log(currentAddress);

  const { data: weather } = useQuery(
    ['weather', current],
    async () => {
      const res = await axios.get(
        `${baseUrl}&base_date=${current.baseDate}&base_time=${current.baseTime}00&nx=${current.nx}&ny=${current.ny}`
      );
      return res;
    },
    { enabled: enable }
  );
  //   console.log(weather?.data);

  const currentWeather = useMemo(() => weather?.data?.response?.body?.items, [weather]);
  //   console.log(currentWeather);

  const handleWeatherReport = () => {
    currentWeather?.item?.map((item: WeatherResponse) => {
      weatherCodeList.find(
        (el) =>
          el.code === item.category &&
          setWeatherReport(
            (prev) => new Map([...prev, [item.category, { name: el.name, value: item.obsrValue, symbol: el.symbol }]])
          )
      );
    });
    // console.log(weatherReport);
  };

  useEffect(() => {
    getDateTime();
  }, [geolocation.loaded]);

  useEffect(() => {
    if (geolocation.loaded) {
      const coords = useCoordinate('toXY', geolocation.coords.lat, geolocation.coords.lng); // 현재 위치를 x,y 좌표로 변환
      setCurrent((prev) => ({ ...prev, nx: coords.x, ny: coords.y }));
      if (current.nx !== 0 && current.ny !== 0) {
        setEnable(false);
        // console.log(
        //   `${baseUrl}&base_date=${current.baseDate}&base_time=${current.baseTime}00&nx=${current.nx}&ny=${current.ny}`
        // );
      }
    }
  }, [geolocation]);

  useEffect(() => {
    handleWeatherReport();
  }, [currentWeather]);

  return (
    <div css={StyledWeatherForecast}>
      <div>
        <h4>{currentAddress?.address_name}</h4>
        {Array.from(weatherReport.values()).map((item) => (
          <div key={item.name}>{`${item.name} ${item.value}${item.symbol}`}</div>
        ))}
      </div>
    </div>
  );
};

export default WeatherForecast;
