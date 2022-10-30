import { addUser, getAllUsers, getUserByUsername } from '../models';
import { generateToken } from '../utilities';
import bcrypt from 'bcryptjs';

export const loginCtr = async (req, res) => {
    try {
        const { username, password, facebook, google } = req.body;
        if (!facebook && !google) {
            if (!username) return res.status(400).json({ message: 'El usuario es obligatorio' });
            if (!password) return res.status(400).json({ message: 'La contraseña es obligatorio' });
            getUserByUsername(username, (err, session) => {
                if (err) return res.status(500).json({ message: 'Ha ocurrido un error', err });
                if (session.length === 0) return res.status(202).json({ message: 'El usuario no existe' });
                if (session[0].state === '0') return res.status(202).json({ message: 'El usuario esta suspendido' });

                // const encrippass = bcrypt.hashSync(password, 8);

                const match = bcrypt.compareSync(password, session[0].password);
                if (!match) return res.status(203).json({ message: 'Contraseña incorecta' });

                const token = generateToken(session[0].id_user);
                res.status(200).json({ session: session[0], token });
            });
        }
    } catch (error) {
        res.status(500).json({ message: 'Ha ocurrido un error interno', error });
    }
};

export const getAllUserCtr = async (req, res) =>
    getAllUsers((err, users) => {
        try {
            if (err) return res.status(500).json({ message: 'Ha ocurrido un error', err });
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: 'Ha ocurrido un error interno', error });
        }
    });

export const addUserCtr = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.state(400).json({ message: 'No se pudieron recuperar campos que son obligatorios' });
    addUser(req.body, (err, data) => {
        if (err) return res.status(500).json({ message: 'Ha ocurrido un error' });
        res.status(200).json(data);
    });
};
