import { NextApiRequest, NextApiResponse } from "next";
import mainServer from '../../../src/axios';
import { getCookie } from '../../../src/getCookie';


const addContacts = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { login } = req.body, token = getCookie(req.headers.cookie as string, "token");
    const { data } = await mainServer.post('/contacts', {
      "login": login
    }, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export default addContacts