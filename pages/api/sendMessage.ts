import { NextApiRequest, NextApiResponse } from "next";
import mainServer from '../../src/axios';
import { getCookie } from '../../src/getCookie';

const sendMessage = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const token = getCookie(req.headers.cookie as string, "token");
    const { chatId, message } = req.body;
    const { data } = await mainServer.post('/send', {
      "encrypted": false,
      "chatId": parseInt(chatId),
      "content": message
    }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      //@ts-expect-error
      message: err.message
    });
  }
};

export default sendMessage