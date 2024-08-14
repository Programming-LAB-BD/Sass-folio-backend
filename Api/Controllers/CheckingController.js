exports.CheckingAuthentication = (req, res, next) => {
  const { token } = req.body;
  const cookie = req.headers.cookie;

  console.log(req.headers.cookie);

  if (token === cookie) {
    res.status(201).json({
      message: "Authentication Complite Successfully.",
      authenticated: true,
    });
  } else {
    res.status(200).json({
      message: "Authentication Falid.",
      authenticated: false,
    });
  }
};
