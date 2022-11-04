import { executeQuery } from '../utilities';
import bcrypt from 'bcryptjs';

export const getUserByUsername = async playlod => {
    const query = ` SELECT *	
                    FROM user a
                    INNER JOIN person b ON a.id_user = b.id_user 
                    WHERE a.username = ?
                    OR b.email = ?`;
    const res = await executeQuery(query, [playlod, playlod]);
    if (res.error) throw res.error.sqlMessage;
    return res;
};

export const getAllUsers = async () => {
    const strQuery = `  SELECT *
                        FROM user
                        ORDER BY username`;
    const res = await executeQuery(strQuery);
    if (res.error) throw res.error.sqlMessage;
    return res;
};

export const addOrUpdateUser = async user => {
    const { id_user, username, password, provider, id_provider, temporal_password, state, temporal_password_expiration } = onFormat(user);
    const query = ` INSERT INTO user (id_user, username, password, provider, id_provider)
                VALUES (?, ?, ?, ?, ?) AS val
                ON DUPLICATE KEY UPDATE
                username = val.username,
                password = val.password,
                provider = val.provider,
                id_provider = val.id_provider,
                temporal_password = ?,
                state = ?,
                temporal_password_expiration = ?,
                edition_date = CURRENT_TIMESTAMP()`;
    const res = await executeQuery(query, [
        id_user,
        username,
        password,
        provider,
        id_provider,
        temporal_password,
        state,
        temporal_password_expiration
    ]);
    if (res.error) throw res.error.sqlMessage;
    return res.insertId;
};

const onFormat = data => {
    data.toString();
    data.id_user = 'id_user' in data ? parseInt(data.id_user) : 0;
    data.username = 'username' in data ? String(data.username).trim() : null;
    data.password = 'password' in data ? bcrypt.hashSync(data.password, 8) : null;
    data.provider = 'provider' in data ? String(data.provider).trim() : null;
    data.id_provider = 'id_provider' in data ? String(data.id_provider).trim() : null;
    data.temporal_password = 'temporal_password' in data ? bcrypt.hashSync(data.temporal_password, 8) : null;
    data.state = 'state' in data ? parseInt(data.state) : 1;
    data.temporal_password_expiration = 'temporal_password_expiration' in data ? `DATE_ADD(NOW(), INTERVAL 10 minute)` : null;
    return data;
};
