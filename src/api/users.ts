import request from '@/utils/request';

// Edit this functions later
export const login = (username: string, password: string) => true;
export const logout = (username: string, password: string) => true;

export const getUsers = (params: any) =>
  request({
    url: '/users',
    method: 'get',
    params,
  });
