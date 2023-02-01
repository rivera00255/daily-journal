export type Journal = {
  id?: number;
  writer?: string;
  content: string;
  createdAt?: string;
  updatedAt?: string;
  weather: {
    // status: 'Sunny' | 'Cloudy' | 'Rain' | 'Snow';
    temperature: number;
    precipitation: number;
  };
  location: string;
};

export type WeatherResponse = {
  baseDate: string;
  baseTime: string;
  category: string;
  nx: number;
  ny: number;
  obsrValue: string;
};
