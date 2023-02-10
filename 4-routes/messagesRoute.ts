import express from 'express'
import { addTrueToSeenMessages, getChatByUser, getMessagesBySenderAndReceiver, sendMessage } from '../2-logic/messagesLogic';

export const MessagesRoute = express.Router();

MessagesRoute.post('/messages/send', async (req, res) => {
    const body = req.body;
    console.log(body);

    try {
        const response = await sendMessage(body)
        res.status(200).json(response)
    } catch (e) {
        res.status(400).json(e)
    }
})

MessagesRoute.get('/getchat/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const response = await getChatByUser(+id)
        console.log(response);

        console.log(response);

        res.status(200).json(response)
    } catch (e) {
        res.status(400).json(e)
    }
})

MessagesRoute.get('/messages/sent/:myid/:otheruserid', async (req, res) => {
    const myId = req.params.myid
    const otherUserId = req.params.otheruserid
    // console.log(params);
    try {
        const response = await getMessagesBySenderAndReceiver(+myId, +otherUserId)
        res.status(200).json(response)
    } catch (e) {
        res.status(400).json(e)

    }
})

MessagesRoute.post('/messages/seen/:id', async (req, res) => {
    const chatId = req.params.id
    console.log(chatId);

    try {
        const response = await addTrueToSeenMessages(+chatId);
        res.status(200).json(response)
    } catch (e) {
        res.status(400).json(e)
    }
})
