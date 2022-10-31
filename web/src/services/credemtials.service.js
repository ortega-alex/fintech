const version = process.env.VERSION_API || 'v1';
const port = process.env.REACT_APP_NODE_PORT || '4000';
const host = process.env.REACT_APP_NODE_HOST || 'localhost';
const domain = `//${host}:${port}`;

export const _SERVER = {
    baseUrl: domain,
    apiUrl: `${domain}/api/${version}/`,
    publicUrl: `${domain}api/public`
};

export const _KEYS = {
    SESSION: process.env.SESSION || 'c6e5b4a1-57a5-11ed-94ff-0242ac160002',
    SECRET: process.env.SECRET || 'ae530912-57a5-11ed-94ff-0242ac160002',
    IV: process.env.IV || 'cd3d4a36-57a5-11ed-94ff-0242ac160002',
    ENCODING: process.env.ENCODING || 'd218595c-57a5-11ed-94ff-0242ac160002',
    TOKEN: process.env.TOKEN || 'd5cceea7-57a5-11ed-94ff-0242ac160002',
    FBID: process.env.FBID || '5733732683361134',
    GOOGLEID: process.env.GOOGLEID || '190033193574-cqs7d0q434edv7bqp4rsp05bcgaauave.apps.googleusercontent.com'
};
