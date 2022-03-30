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
    const { data } = await mainServer.post('/users/authenticate', JWTData);
    res.status(200).json(data);
  } catch (error: any) {
    if (error.response.status === 401)
      res.status(401).json({
        message: 'Invalid username or password'
      });
    else
      res.status(500).json({
        message: 'Something went wrong, please try again later'
      });
  }
};

export default authenticate