import axios from 'axios';
import { getStorage, _KEYS } from '@/services';

export const PublicProvateInterceptor = () => {
    axios.interceptors.request.use(async request => {
        const local = await getStorage(_KEYS.TOKEN);
        const token = local ? JSON.parse(local) : null;
        if (token) {
            request.headers.Authorization = `Bearer ${token}`;
        }
        return request;
    });
    axios.interceptors.response.use(
        response => response,
        error => Promise.reject(error)
    );
};

export default PublicProvateInterceptor;
