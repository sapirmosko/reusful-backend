import { UserInterface } from "../models/userModel";
import * as jwt from 'jsonwebtoken';

const PRIVATE_KEY = "BDJKQsalbjsakbdjsabdjsbdWBDKJQWBJDQWD"

export async function generateToken(user: UserInterface) {
    return jwt.sign({
        'sub': user.id,
        'firstName': user.firstName,
        'lastName': user.lastName,
        'username': user.username,
        'email': user.email
    }, PRIVATE_KEY, { expiresIn: '2h' })
}