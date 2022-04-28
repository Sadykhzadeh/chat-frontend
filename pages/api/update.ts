import { NextApiRequest, NextApiResponse } from "next";
import mainServer from '../../src/axios';
import { getCookie } from '../../src/getCookie';

const register = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { name, surname, phoneNumber } = req.body,
      token = getCookie(req.headers.cookie as string, "token");
    console.table({ name, surname, phoneNumber });
    const { data } = await mainServer.post('users/update/', {
      "name": name,
      "surname": surname,
      "phoneNumber": phoneNumber,
    }, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    });
    res.status(200).json({});
  } catch (error) {
    console.log(error);
    res.status(500).json({
      //@ts-expect-error
      message: error.message
    });
  }
}

export default register