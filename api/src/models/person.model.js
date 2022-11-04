import { executeQuery } from '../utilities';

export const addOrUpdatePerson = async person => {
    const { id_person, id_user, full_name, email, phone_number, date_of_birth, state } = onFormat(person);
    const strQuery = `  INSERT INTO person (id_person, id_user, full_name, email)
                        VALUES (?, ?, ?, ?) AS val
                        ON DUPLICATE KEY UPDATE
                        id_user = val.id_user,
                        full_name = val.full_name,
                        email = val.email,
                        phone_number = ?,
                        date_of_birth = ?,
                        state = ?,
                        edition_date = CURRENT_TIMESTAMP()`;
    const res = await executeQuery(strQuery, [id_person, id_user, full_name, email, phone_number, date_of_birth, state]);
    if (res.error) throw res.error.sqlMessage;
    return res.insertId;
};

const onFormat = data => {
    data.toString();
    data.id_person = 'id_person' in data ? parseInt(data.id_person) : 0;
    data.id_user = 'id_user' in data ? String(data.id_user).trim() : null;
    data.full_name = 'full_name' in data ? String(data.full_name).trim() : null;
    data.email = 'email' in data ? String(data.email).trim() : null;
    data.phone_number = 'phone_number' in data ? String(data.phone_number).trim() : null;
    data.date_of_birth = 'date_of_birth' in data ? String(data.date_of_birth).trim() : null;
    data.state = 'state' in data ? parseInt(data.state) : 1;
    return data;
};
