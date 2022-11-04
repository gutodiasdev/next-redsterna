import { atom } from 'recoil';

const UserState = atom({
  key: 'UserState',
  default: ''
});

export { UserState };