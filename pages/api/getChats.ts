import { NextApiRequest, NextApiResponse } from "next";
import mainServer from '../../src/axios';

const decrypt = (message: string, key: string): string => {
  let res = "";
  message = message.toString().toUpperCase();
  key = key.toString();
  for (let i = 0, j = 0; i < message.length; i++) {
    let c = message.charAt(i).charCodeAt(0);
    if (c < 65 || c > 91) res += String.fromCharCode(c);
    res += String.fromCharCode((c - (key.charAt(j).charCodeAt(0)) + 26) % 26 + 65);
    j = ++j % key.length;
  }
  return res;
}

const getChats = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const token = req.headers.authorization as string;
    const { data } = await mainServer.get('/chats', {
      headers: {
        Authorization: token
      }
    })
    // convert data to array of unique chat ids
    const chatIds = data as number[], output = [];
    // get all chats
    for (let i in chatIds) {
      const chats = await mainServer.get(`/chats/${i}`, {
        headers: {
          Authorization: token
        }
      });
      const chatsData = chats.data;
      if (chatsData) {
        chatsData.usersIds = chatsData.usersIds.filter((value: any, index: any, self: string | any[]) => {
          return self.indexOf(value) === index;
        })
        const membersList = [];
        for (let j of chatsData.usersIds) {
          const chatMember = await mainServer.get(`/users/${j}`, {
            headers: {
              Authorization: token
            }
          })
          const memberData = chatMember.data
          membersList.push(memberData);
        }
        chatsData.members = membersList;

        const messagesList = [];
        for (let j of chatsData.messagesIds) {
          const message = await mainServer.get(`/messages/${j}?chatId=${i}`, {
            headers: {
              Authorization: token,
            }
          })
          const messageData = message.data;
          messagesList.push(decrypt(messageData.content, req.headers.dec as string));
        }

        chatsData.messages = messagesList;
        output.push({
          chatsData
        });
      }
    }
    res.status(200).json(output);
  } catch (err) {
    res.status(501).json({
      //@ts-expect-error
      message: err.message.slice(-100)
    });
  }
};

export default getChats