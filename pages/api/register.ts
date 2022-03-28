import { NextApiRequest, NextApiResponse } from "next";
import mainServer from '../../src/axios';
import { UserRequest } from '../../interfaces/logres/UserRequest';

const register = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { username, password, name, surname, phoneNumber } = req.body;
    const userData = {
      "login": username,
      "password": password,
      "name": name,
      "surname": surname,
      "phoneNumber": phoneNumber,
    } as UserRequest;
    const { data } = await mainServer.post('/user/register', userData);
    res.status(200).json(data);
  } catch (error) {
    res.status(401).json({
      error: 'Wrong password'
    });
  }
};

export default register