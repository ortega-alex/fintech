import { _POST } from './http.service';
const controller = 'user';

export const httpSingIn = async body => await _POST(`${controller}/sing-in`, body);
