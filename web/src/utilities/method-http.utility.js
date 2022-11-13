import axios from 'axios';
import { _KEYS, _SERVER } from '@/services';
import { decryptData, encryptData } from './encryption.utility';
const timeout = 20000;

export const httpRequest = async (path, method, data = {}) => {
    try {
        data = process.env.NODE_ENV === 'development' ? data : { data: encryptData(body) };
        const res = await axios({
            method: method || 'GET',
            url: _SERVER.apiUrl + path,
            data,
            timeout
        });
        return process.env.NODE_ENV === 'development' ? res.data : decryptData(res.data.data);
    } catch (error) {
        return Promise.reject(error);
    }
};
