import { config } from 'dotenv';
config();

export const PORT = process.env.PORT || 4000;
export const NODE_ENV = process.env.NODE_ENV || 'development';
export const MYSQL_SETTINGS = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'abc123**',
    database: process.env.DB_NAME || 'fintech',
    port: process.env.DB_PORT || 3307
};
export const _KEYS = {
    SESSION: process.env.SESSION || 'c6e5b4a1-57a5-11ed-94ff-0242ac160002',
    SECRET: process.env.SECRET || 'ae530912-57a5-11ed-94ff-0242ac160002',
    IV: process.env.IV || 'cd3d4a36-57a5-11ed-94ff-0242ac160002',
    ENCODING: process.env.ENCODING || 'd218595c-57a5-11ed-94ff-0242ac160002',
    TOKEN: process.env.TOKEN || 'd5cceea7-57a5-11ed-94ff-0242ac160002'
};
