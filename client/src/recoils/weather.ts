import { atom } from 'recoil';

const weatherState = atom({
  key: 'weatherState',
  default: {
    status: '',
    temperature: 0,
    precipitation: 0,
    location: '',
  },
  effects: [],
});

export default weatherState;
