import { NextApiRequest, NextApiResponse } from "next";
import mainServer from '../../src/axios';

const me = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const token = req.headers.authorization as string;
    const { data } = await mainServer.get('/users/me', {
      headers: {
        Authorization: token
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

export default me