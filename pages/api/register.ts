import { NextApiRequest, NextApiResponse } from "next";
import mainServer from '../../src/axios';
import { UserRequest } from '../../interfaces/logres/UserRequest';

const register = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { login, password, name, surname, phoneNumber } = req.body;
    const userData = {
      "login": login,
      "password": password,
      "name": name,
      "surname": surname,
      "phoneNumber": phoneNumber,
    } as UserRequest;
    console.log(userData);
    const { data } = await mainServer.post('/users/register', userData);
    res.status(200).json(data);
  } catch (error) {
    res.status(401).json({
      error: 'Wrong password'
    });
  }
};

export default register