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
    console.error(err);
    res.status(500).json({
      message: 'Something went wrong, please try again later'
    });
  }
};

export default newChat