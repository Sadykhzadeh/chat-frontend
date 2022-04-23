import { NextApiRequest, NextApiResponse } from "next";
import mainServer from '../../src/axios';

const me = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const token = req.headers.authorization as string;
    console.log(token);
    const { data } = await mainServer.get('/users/me', {
      headers: {
        Authorization: token
      }
    })
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({
      //@ts-expect-error
      message: err.message
    });
  }
};

export default me