const router = require('express').Router();
const jwt = require('jsonwebtoken');

const {Game, User} = require('../db');

Game.sync().then(() => {
  console.log('Game created');
});

router.get('/all', async (req, res) => {
  const games = await Game.findAll();

  res.status(200).json({
    games,
  });

});

router.get('/:id', async (req, res) => {
  console.log(req);
  await Game.findOne({
    where: {id: req.params.id, owner_id: req.body.user.id},
  })
    .then((game) => {
      res.status(200).json({
        game: game,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: 'Data not found.',
      });
    });
});

router.post('/create', async (req, res) => {
  await Game.create({
    title: req.body.game.title,
    owner_id: req.body.user.id,
    studio: req.body.game.studio,
    esrb_rating: req.body.game.esrb_rating,
    user_rating: req.body.game.user_rating,
    have_played: req.body.game.have_played,
  })
    .then((game) => {
      const token = jwt.sign({id: req.body.user.id}, process.env.SECRET_TOKEN, {
        expiresIn: 60 * 60 * 24,
      });
      res.send({token, game});
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
});

router.put('/update/:id', async (req, res) => {
  await Game.update(
    {
      title: req.body.game.title,
      studio: req.body.game.studio,
      esrb_rating: req.body.game.esrb_rating,
      user_rating: req.body.game.user_rating,
      have_played: req.body.game.have_played,
    },
    {
      where: {
        id: req.params.id,
        owner_id: req.body.user.id,
      },
    }
  )
    .then((game) => {
      res.status(200).json({
        game: game,
        message: 'Successfully updated.',
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
      });
    });
});

router.delete('/remove/:id', async (req, res) => {
  await Game.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((game) => {
      res.status(200).json({
        game: game,
        message: 'Successfully deleted',
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err.message,
      });
    });
});

module.exports = router;
