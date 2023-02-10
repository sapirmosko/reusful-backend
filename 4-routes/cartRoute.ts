import express from 'express'
import { addProductToCart, checkIfProductInCart, deleteProductFromCart, showCartProducts } from '../2-logic/cartLogic';

export const CartRoute = express.Router();

CartRoute.post('/cart/add', async (req, res) => {
    const { userId } = req.body;
    const { productId } = req.body;
    try {
        const response = await addProductToCart(userId, productId)
        res.status(200).json(response)
    } catch (e) {
        res.status(400).json(e)
    }
})

CartRoute.get('/cart/show/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const response = await showCartProducts(+id);
        res.status(200).json(response)
    } catch (e) {
        res.status(400).json(e)
    }
})

CartRoute.post('/cart/delete', async (req, res) => {
    const { userId } = req.body;
    const { productId } = req.body;
    try {
        const response = await deleteProductFromCart(userId, productId);
        res.status(200).json(response)
    } catch (e) {
        res.status(400).json(e)
    }

})

CartRoute.post('/cart/check', async (req, res) => {
    const { userId } = req.body;
    const { productId } = req.body;
    try {
        const response = await checkIfProductInCart(userId, productId);
        res.status(200).json(response)
    } catch (e) {
        res.status(400).json(e)
    }
})