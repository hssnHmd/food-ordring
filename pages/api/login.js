import cookie from 'cookie';

const handler = (req, res) => {
  if (req.method === 'POST') {
    const { userName, password } = req.body;
    if (
      userName === process.env.ADMIN_USERNAME &&
      password === process.env.ADMIN_PASSWORD
    ) {
      res.setHeader(
        'Set-Cookie',
        cookie.serialize('token', process.env.TOKEN, {
          maxAge: 60 * 60,
          sameSite: 'strict',
          path: '/',
        })
      );
      res.status(200).json('Successfull');
    } else {
      res.status(500).json('Wrongg Credentials');
    }
  }
};

export default handler;
