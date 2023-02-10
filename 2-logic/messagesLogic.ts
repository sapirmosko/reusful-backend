import { OkPacket } from "mysql2";
import { execute } from "../1-dal/dal";
import { MessagesInterface } from "../models/MessagesModel";

export async function sendMessage(messageSent: MessagesInterface) {
    const { sender_id, reciver_id, message, time } = messageSent
    const queryChat = `SELECT * FROM chat WHERE id in (select id from chat where (receiver_id = ${reciver_id} OR sender_id = ${reciver_id}) and (receiver_id = ${sender_id} or sender_id = ${sender_id}))`
    const [resultsChat] = await execute<any>(queryChat);
    console.log(resultsChat);
    let chatId;
    if (resultsChat.length > 0) {
        chatId = resultsChat[0].id;
    } else {
        console.log('no chat');
        const queryInsertChat = 'INSERT INTO chat(sender_id,receiver_id) VALUES (?,?)';
        const [resultsInsertChat] = await execute<OkPacket>(queryInsertChat, [sender_id, reciver_id]);
        console.log('insertChat');
        console.log(resultsInsertChat);
        if (resultsInsertChat) {
            chatId = resultsInsertChat.insertId;
        }
    }
    console.log(chatId);

    const addMessage = `INSERT INTO messages(sender_id,receiver_id,message,time,chat_id) VALUES (?,?,?,?,?)`
    const [resultsMessage] = await execute<OkPacket>(addMessage, [sender_id, reciver_id, message, time, chatId])
    console.log('message');
    console.log(resultsMessage);
}

export async function getChatByUser(id: number) {
    const query = `SELECT chat.id, chat.sender_id, chat.receiver_id, 
    (CASE WHEN chat.receiver_id = ${id} THEN users1.username 
          WHEN chat.sender_id = ${id} THEN users2.username 
     END) as username,
    (CASE WHEN chat.receiver_id = ${id} THEN users1.id 
          WHEN chat.sender_id = ${id} THEN users2.id 
     END) as other_user_id
    FROM chat 
    JOIN users as users1 ON chat.sender_id = users1.id 
    JOIN users as users2 ON chat.receiver_id = users2.id 
    WHERE chat.id in (select id from chat where (receiver_id = ${id} OR sender_id = ${id}))`
    const [results] = await execute(query)
    return results;
}

export async function getMessagesBySenderAndReceiver(sender_id: number, receiver_id: number) {
    const query = `SELECT messages.*, users.username FROM messages
    JOIN users ON messages.sender_id = users.id
    WHERE (sender_id = ${sender_id} AND receiver_id = ${receiver_id}) OR (sender_id = ${receiver_id} AND receiver_id = ${sender_id})
    ORDER BY messages.time ASC`
    const [results] = await execute(query)
    return results;
}

export async function addTrueToSeenMessages(chatId: number) {
    const query = `UPDATE messages SET seen = ${1} WHERE chat_id = ${chatId}`
    const [results] = await execute(query);
    return results;
}