import { NextApiRequest, NextApiResponse } from 'next';
import mainServer from '../../../src/axios';

const getAllContacts = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const token = req.headers.authorization as string;
    const { data } = await mainServer.get('/contacts', {
      headers: {
        Authorization: token
      }
    })
    const fullInfo = [];
    for (const contact of data) {
      const contactInfo = await mainServer.get(`/contacts/${contact}`, {
        headers: {
          Authorization: token
        }
      })
      fullInfo.push(contactInfo.data.userId);
    }
    const uniqueUserIDs = fullInfo.filter((v, i, a) => a.indexOf(v) === i);
    const users = [];
    for (const userId of uniqueUserIDs) {
      const userInfo = await mainServer.get(`/users/${userId}`, {
        headers: {
          Authorization: token
        }
      })
      users.push(userInfo.data);
    }
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({
      //@ts-expect-error
      message: err.message
    });
  }
}

export default getAllContacts;