import axios from 'axios';

import { encryptData, decryptData } from '@/utilities/encryption.utility';
import { _SERVER } from './credemtials.service';

export const _GET = async path => {
    try {
        const res = await axios.get(_SERVER.apiUrl + path);
        return process.env.NODE_ENV === 'development' ? res.data : decryptData(res.data.data);
    } catch (error) {
        return Promise.reject(error);
    }
};

export const _POST = async (path, body) => {
    try {
        body = process.env.NODE_ENV === 'development' ? body : { data: encryptData(body) };
        const res = await axios.post(_SERVER.apiUrl + path, body);
        return process.env.NODE_ENV === 'development' ? res.data : decryptData(res.data.data);
    } catch (error) {
        return Promise.reject(error);
    }
};

export const _GET_BLOB = async path => {
    try {
        const res = await axios.get(_SERVER.apiUrl + path, { responseType: 'blob' });
        return res.data;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const _GET_SIGNAL = path => {
    const controller = new AbortController();
    return { call: axios.get(_SERVER.apiUrl + path, { signal: controller.signal }), controller };
};
