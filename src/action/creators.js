import {
  LOGIN,
  LOGOUT,
  TIME,
  STUDENT,
  MESSAGE,
  SOCKET
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

export const setSocket = (payload) => ({
  type: SOCKET,
  payload: payload,
});

