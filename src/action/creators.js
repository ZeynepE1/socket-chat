import {
  LOGIN, 
  LOGOUT, 
  TIME,
  STUDENT,
  MESSAGE
} from './types';

export const login = (payload) => ({
  type: LOGIN,
  payload,
});

export const saveMessage = (payload) => ({
  type: MESSAGE,
  payload: payload,
});

export const logout = () => ({
  type: LOGOUT,
});


