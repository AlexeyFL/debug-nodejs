const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const {User} = require('../db');

User.sync().then(() => {
  console.log('User created');
});
router.post('/signup', async (req, res) => {
  const salt = await bcrypt.genSaltSync(5);
  User.create({
    full_name: req.body.user.full_name,
    username: req.body.user.username,
    passwordhash: bcrypt.hashSync(req.body.user.passwordhash, salt),
    email: req.body.user.email,
  })
    .then((user) => {
      const token = jwt.sign({id: user.id}, process.env.SECRET_TOKEN, {
        expiresIn: 60 * 60 * 24,
      });
      res.status(200).send({token, user});
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
});

router.get('/user/:id', async (req, res) => {
  await User.findByPk(req.params.id).then((user) => {
    console.log('USER', user.id);
    res.send('done')
  });
});

router.post('/signin', (req, res) => {
  User.findOne({where: {username: req.body.user.username}}).then((user) => {
    if (user) {
      bcrypt.compare(
        req.body.user.passwordhash,
        user.passwordhash,
        function (err, matches) {
          if (matches) {
            const token = jwt.sign({id: user.id}, process.env.SECRET_TOKEN, {
              expiresIn: 60 * 60 * 24,
            });
            res.json({
              user: user,
              message: 'Successfully authenticated.',
              sessionToken: token,
            });
          } else {
            res.status(502).send({error: 'Passwords do not match.'});
          }
        }
      );
    } else {
      res.status(403).send({error: 'User not found.'});
    }
  });
});

module.exports = router;
