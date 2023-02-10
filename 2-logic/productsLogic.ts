import { OkPacket } from "mysql2";
import { execute } from "../1-dal/dal";
import { ProductInterface } from "../models/productModel";
import { deleteImageFromS3, saveImagesToS3, saveProductImagesToS3 } from "./awsLogic";
const uniqid = require('uniqid');

export async function getProductsByCategorie(id: number) {
    const query = `SELECT id,userId,productName,productDescription, productPrice,productStatus,DATE_FORMAT(productDate, '%Y:%m:%d') as productDate,categorieId,productImage FROM products WHERE categorieId = ${id}`;
    const [results] = await execute(query);
    return results;
}

export async function addProduct(product: ProductInterface, file: any) {
    const imageId = 'productImageMain' + uniqid();
    const { userId, productName, productDescription, productPrice, productStatus, productDate, categorieId } = product
    let key = await saveImagesToS3(file, imageId)
    const query = 'INSERT INTO products(userId,productName,productDescription,productPrice,productStatus,productDate,productImage,categorieId) VALUES (?,?,?,?,?,?,?,?)'
    const [results] = await execute<OkPacket>(query, [userId, productName, productDescription, productPrice, productStatus, productDate, key, categorieId]);
    return results;
}

export async function getProductById(id: number) {
    const query = `SELECT products.id, products.userId, productName, productDescription, productPrice, productStatus, DATE_FORMAT(productDate, '%Y:%m:%d') as productDate, categorieId, productImage, users.username ,categorie.categorieName
    FROM products 
    JOIN users ON products.userId = users.id
    JOIN categorie ON products.categorieId = categorie.id 
    WHERE products.id = ${id}`
    const [results] = await execute<OkPacket>(query);
    return results;
}

export async function getProductByUserId(id: number) {
    const query = `SELECT * FROM products WHERE userId = ${id}`
    const [results] = await execute<OkPacket>(query);
    return results;
}

export async function deleteProductById(product: ProductInterface, id: number) {
    const { productImage } = product

    const qeuryImages = `SELECT * FROM productimages WHERE productId = ${id}`
    const resultsImagesRes = await execute<OkPacket>(qeuryImages);
    const resultsImage = resultsImagesRes[0];
    resultsImage.forEach(async (image: any) => {
        await deleteImageFromS3(image.productsImage)
    })

    await deleteImageFromS3(productImage)
    const query = `DELETE FROM products WHERE id = ${id}`
    const [results] = await execute<OkPacket>(query)
    return results;
}

export async function addproductImages(files: any[], productId: any) {
    const resultsArray: any = [];
    files.forEach(async file => {
        const imageId = 'secondaryProductImages' + uniqid();
        let key = await saveProductImagesToS3(file, imageId)
        const query = 'INSERT INTO productimages(productId,productsImage) VALUES (?,?)'
        const [results] = await execute<OkPacket>(query, [productId, key]);
        resultsArray.push(results);
    })
    return resultsArray;
}


export async function getProductImages(id: number) {
    const query = `SELECT * FROM productimages WHERE productId = ${id}`
    const [results] = await execute(query)
    return results;
}

export async function editProduct(product: ProductInterface, id: number) {
    const { productName, productDescription, productPrice, productDate, categorieId } = product
    const query = `UPDATE products SET productName = '${productName}', productDescription = '${productDescription}', productPrice = '${productPrice}', productDate = '${productDate}', categorieId = '${categorieId}' WHERE id = ${id}`
    const [results] = await execute<OkPacket>(query);
    return results;
}