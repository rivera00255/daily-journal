import { atom } from 'recoil';
import { Journal } from '../model/Journals';

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
