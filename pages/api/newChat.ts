import { NextApiRequest, NextApiResponse } from "next";
import mainServer from '../../src/axios';
import { getCookie } from '../../src/getCookie';

const newChat = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const token = getCookie(req.headers.cookie as string, "token");
    const { title, usersIds } = req.body;
    const { data } = await mainServer.post('/chats', {
      "title": title,
      "usersIds": usersIds
    }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    res.status(200).json(data);
  } catch (err) {
    // console.log(err);
    res.status(500).json({
      //@ts-expect-error
      message: err.message
    });
  }
};

export default newChat