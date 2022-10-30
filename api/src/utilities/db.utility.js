import mysql from 'serverless-mysql';
import { MYSQL_SETTINGS } from './envirinment.utility';

const db = mysql({ config: MYSQL_SETTINGS });

export const executeQuery = async (query, values = []) => {
    try {
        const res = await db.query(query, values);
        await db.end();
        return res;
    } catch (error) {
        return { error };
    }
};
