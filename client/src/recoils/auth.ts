import { atom } from 'recoil';

const authState = atom({
  key: 'authState',
  default: null as null | { user: string; token: string },
  effects: [],
});

export default authState;
