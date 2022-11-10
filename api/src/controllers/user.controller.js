import { addOrUpdateUser, getAllUsers, getUserByUsername } from '../models';
import { generateToken } from '../utilities';
import bcrypt from 'bcryptjs';
import { addOrUpdatePerson } from '../models/person.model';

export const loginCtr = async (req, res) => {
    try {
        const { username, password, provider, name, email, id, registration } = req.body;
        let playload;
        if (!provider) {
            if (!username) return res.status(203).json({ message: 'El usuario es obligatorio' });
            if (!password) return res.status(203).json({ message: 'La contraseña es obligatorio' });
            playload = username;
        } else {
            if (!email || !name || !id) return res.status(203).json({ message: 'No se pudo recuperara informacion de tu cuenta' });
            playload = email;
        }

        let response = await getUserByUsername(playload);
        if (!registration) {
            if (response.length === 0) return res.status(203).json({ message: 'El usuario no existe' });
            if (response[0].state === '0') return res.status(203).json({ message: 'El usuario esta suspendido' });
        } else if (response.length === 0) {
            const user_id = await addOrUpdateUser({
                username: String(email).split('@')[0],
                provider,
                provider_id: id
            });
            await addOrUpdatePerson({
                user_id,
                full_name: name,
                email
            });
            response = await getUserByUsername(playload);
        }
        const user = response[0];

        if (!provider) {
            const match = bcrypt.compareSync(password, user.password);
            if (!match) return res.status(203).json({ message: 'Contraseña incorecta' });
        }

        const token = generateToken(user.user_id);
        res.status(200).json({ session: user, token });
    } catch (error) {
        res.status(500).json({ message: 'Ha ocurrido un error interno', error });
    }
};

export const getAllUserCtr = (req, res) =>
    getAllUsers()
        .then(users => res.status(200).json(users))
        .catch(error => res.status(500).json({ message: 'Ha ocurrido un error interno', error }));

export const addUserCtr = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(203).json({ message: 'No se pudieron recuperar campos que son obligatorios' });
    addOrUpdateUser(req.body)
        .then(() => res.status(200).json({ error: false, message: 'Usuario guardado exitosamente' }))
        .catch(error => res.status(500).json({ message: 'Ha ocurrido un error interno', error }));
};
