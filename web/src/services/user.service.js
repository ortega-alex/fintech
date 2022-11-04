import { _POST } from './http.service';
const controller = 'user';

export const httpLogin = async body => await _POST(`${controller}/login`, body);
