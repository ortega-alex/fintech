import axios from 'axios';
import { getStorage, _KEYS, _SERVER } from '@/services';
const timeout = 20000;

export const httpRequest = async (path, method, data) => {
    try {
        const res = await axios({
            method: method || 'GET',
            url: _SERVER.apiUrl + path,
            data: data || {},
            timeout
        });
        return res.data;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const _POST_FORMDATA = async (path, body = {}) => {
    const data = new FormData();
    Object.keys(body).forEach(key => data.append(key, body[key]));
    try {
        const token = await getStorage(_KEYS.TOKEN);
        return await fetch(_SERVER.apiUrl + path, {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`
            },
            body: data,
            timeout
        }).then(res => res.json());
    } catch (error) {
        return Promise.reject(error);
    }
};
