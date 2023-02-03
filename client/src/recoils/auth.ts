import { atom } from 'recoil';
import { User } from '../model/Users';

const authState = atom({
  key: 'authState',
  default: null as null | { user: string; token: string },
  effects: [
    ({ setSelf, onSet }: any) => {
      const loginUser = localStorage.getItem('user');
      loginUser !== null && setSelf(JSON.parse(loginUser));

      onSet((user: User) => {
        user !== null ? localStorage.setItem('user', JSON.stringify(user)) : localStorage.removeItem('user');
      });
    },
  ],
});

export default authState;
