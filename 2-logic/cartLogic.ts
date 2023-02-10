import { OkPacket } from "mysql2";
import { execute } from "../1-dal/dal";

export async function addProductToCart(userId: number, productId: number) {
    const query = 'INSERT INTO cart(userId,productId) VALUES(?,?)'
    const [results] = await execute<OkPacket>(query, [userId, productId])
    return results;
}

export async function showCartProducts(userId:number){
    const query = `SELECT products.* FROM cart JOIN products ON cart.productId = products.id WHERE cart.userId = ${userId}`
    const [results] = await execute<OkPacket>(query)
    return results
}

export async function deleteProductFromCart(userId:number,productId:number){
    const query = `DELETE FROM cart WHERE userId = ${userId} AND productId = ${productId}`
    const [results] = await execute<OkPacket>(query);
    return results;
}

export async function checkIfProductInCart(userId:number, productId:number){
    const query = `SELECT * FROM cart WHERE userId = ${userId} AND productId = ${productId}`
    const [results] = await execute<OkPacket>(query);
    return results;
}