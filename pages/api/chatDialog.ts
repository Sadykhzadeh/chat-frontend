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

const chatDialog = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const token = req.headers.authorization as string;
    const { chatId } = req.body;
    const chats = await mainServer.get(`/chats/${chatId}`, {
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
        const message = await mainServer.get(`/messages/${j}?chatId=${chatId}`, {
          headers: {
            Authorization: token,
          }
        })
        const messageData = message.data;
        messageData.author = membersList.find((value: any) => {
          return value.id === messageData.authorId;
        })
        messageData.content = decrypt(messageData.content, req.headers.dec as string)
        const creationTime = new Date(messageData.creationTime);
        messageData.creationTime = creationTime.toLocaleString('en-US', {
          hour12: false,
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
        });
        messagesList.push(messageData);
      }

      chatsData.messages = messagesList;
      chatsData.chatId = chatId;

      res.status(200).json(chatsData);
    }
  } catch (err) {
    res.status(501).json({
      //@ts-expect-error
      message: err.message.slice(-100)
    });
  }
};

export default chatDialog