const user = require('../models/user');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
  const { fullname, email, password, password2 } = req.body;

  const hashPassword = bcrypt.hashSync(password, 8);

  let result;
  try {
    result = await user.create({
      fullname,
      email,
      password: hashPassword,
    });

    result.password = undefined; // remove hash password from result

    res.json({
      message: 'ok',
      data: result,
    });
  } catch (err) {
    // result = err.message;

    res.json({
      message: 'error',
      data: err.name,
    });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  let result;
  try {
    result = await user.findOne({ where: { email: email } });
    if (result != null) {
      if (bcrypt.compareSync(password, result.password)) {
        res.json({
          message: 'ok',
          data: result,
        });
      } else {
        res.json({
          message: 'Credential Error',
        });
      }
    }
  } catch (err) {
    res.json({
      message: err.name,
    });
  }
  // console.log(fullname, email, password, password2);
};
