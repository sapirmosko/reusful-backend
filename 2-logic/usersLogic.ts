import { OkPacket } from "mysql2";
import { execute } from "../1-dal/dal";
import { UserInterface } from "../models/userModel";
import { saveImagesToS3User } from "./awsLogic";
const uniqid = require('uniqid');

export async function getAllUsers() {
    const query = 'SELECT * FROM users';
    const [results] = await execute(query);
    return results
};

export async function getUserById(id: number) {
    const query = `SELECT firstName,lastName,username,country,city,streetAddress,email,userImage FROM users WHERE id = ${id}`
    const [results] = await execute(query);
    return results;
}

export async function register(user: UserInterface) {
    const { firstName, lastName, username, country, city, streetAddress, email, password } = user;
    const query = `INSERT INTO users(firstName,lastName,username,country,city,streetAddress,email,password) VALUES (?,?,?,?,?,?,?,?)`;
    const results = await execute<OkPacket>(query, [firstName, lastName, username, country, city, streetAddress, email, password]);
    user.id = results[0].insertId;
    return results;
};

export async function addImageForUser(file: any, id: number) {
    const imageId = 'profileImage' + uniqid();
    const key = await saveImagesToS3User(file, imageId)
    const query = `UPDATE users SET userImage = '${key}' where id =${id}`
    const [results] = await execute(query);
    return results;
}