import express from 'express';
import { hashedPassword } from '../1-dal/hashedPassword';
import { addImageForUser, getAllUsers, getUserById, register } from '../2-logic/usersLogic';
import { generateToken } from '../1-dal/jwt';
import { UserInterface } from '../models/userModel';

export const UserRoute = express.Router();

UserRoute.get('/users', (req, res) => {
    const users = getAllUsers();
    try {
        res.status(200).json(users)
    } catch (e) {
        res.status(400).json(e)
    }
});

UserRoute.get('/users/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const response = await getUserById(+id);
        res.status(200).json(response)
    } catch (e) {
        res.status(400).json(e)
    }
})


UserRoute.post('/users/register', async (req, res) => {
    const user:UserInterface = req.body;
    user.password = hashedPassword(user.password)
    console.log(user.password);
    
    try {
        await register(user);
        const token = await generateToken(user);
        res.status(200).json(token);
    } catch (e) {
        res.status(400).json(e)
    }
});

UserRoute.post('/users/login', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const users = await getAllUsers();
    try {
        const user: any = users.find((u) => u.username === username && u.password === hashedPassword(password));
        if (user) {
            const token = await generateToken(user)
            res.status(200).json(token);
        } else {
            res.status(401).json('wrong username or password');
        }
    } catch (e) {
        res.status(400).json('something went wrong...')
    }
})

UserRoute.post('/users/addimage/:id', async (req: any, res: any) => {
    const file = req.files.userImage;
    const id = req.params.id;
    // console.log(file);

    await addImageForUser(file, id)
});
