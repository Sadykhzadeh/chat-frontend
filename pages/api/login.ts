import { NextApiRequest, NextApiResponse } from "next";
import mainServer from '../../src/axios';
import { JWTRequest } from '../../interfaces/logres/JWTRequest';

const authenticate = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { username, password } = req.body;
    const JWTData = {
      "username": username,
      "password": password
    } as JWTRequest;
    const { data } = await mainServer.post('/authenticate', JWTData);
    res.status(200).json(data);
  } catch (error) {
    res.status(401).json({
      error: 'Wrong password'
    });
  }
};

export default authenticate