import Config from 'react-native-config';

const domain = Config.NODE_HOST || 'http://localhost';
const port = Config.NODE_PORT || '8095';
const vetsion = Config.NODE_VERSION || 'v1';
export const _APP_ENV = Config.APP_ENV || 'developer';
export const _SERVER = {
    baseUrl: `${domain}:${port}`,
    apiUrl: `${domain}:${port}/api/${vetsion}`
};

export const _KEYS = {
    SESSION: Config.SESSION || 'c6e5b4a1-57a5-11ed-94ff-0242ac160002',
    SECRET: Config.SECRET || 'ae530912-57a5-11ed-94ff-0242ac160002',
    IV: Config.IV || 'cd3d4a36-57a5-11ed-94ff-0242ac160002',
    ENCODING: Config.ENCODING || 'd218595c-57a5-11ed-94ff-0242ac160002',
    TOKEN: Config.TOKEN || 'd5cceea7-57a5-11ed-94ff-0242ac160002',
    FBID: Config.FBID || '5733732683361134',
    GOOGLEID: Config.GOOGLEID || '190033193574-cqs7d0q434edv7bqp4rsp05bcgaauave.apps.googleusercontent.com'
};
