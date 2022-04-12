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
    // console.log(userData);
    const { data } = await mainServer.post('/users/register', userData);
    res.status(200).json(data);
  } catch (error) {
    // @ts-expect-error
    if (error.response.status == 406) {
      res.status(406).json({
        error: "Not all requirements are followed (incorrect phone number format, login format, etc.)"
      })
    }
    // @ts-expect-error
    else if (error.response.status == 409) {
      res.status(409).json({
        error: "User with this login already exists"
      })
    } else {
      res.status(500).json({
        //@ts-expect-error
        message: error.message
      });
    }
  }
}

export default register