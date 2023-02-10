import express from 'express';
import { dallE } from '../2-logic/openAiLogic';

export const openAiServer = express.Router();

openAiServer.post('/openai/image', async (req, res) => {
    const body = req.body.body;
    // console.log(body);
    
    try {
        const data = await dallE(body);
        res.send(data)
    } catch (e) {
        // console.log(e)
        res.send(e)
    }
})