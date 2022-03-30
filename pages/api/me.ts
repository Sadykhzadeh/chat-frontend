import { NextApiRequest, NextApiResponse } from "next";
import mainServer from '../../src/axios';

const me = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { data } = await mainServer.get('/users/me', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('t')}`
      }
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(401);
  }
};

export default me