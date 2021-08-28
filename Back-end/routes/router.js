const { Router } = require('express');
const authenticate = require('../middleware/authenticate');

const router = Router();

const {
  getAllUsers, createUser, getUser, login,
} = require('../controllers/users');
const { updateHoldings } = require('../controllers/holdings');
const { getAllStocks, getMatchingStocks } = require('../controllers/stocks');
const { getRanking } = require('../controllers/ranking');

router.get('/users', getAllUsers);
router.get('/user', authenticate, getUser);
router.post('/users', createUser);
router.post('/user/login', login);

router.put('/user/updateHolding', authenticate, updateHoldings);

router.get('/users/ranking', getRanking)

router.get('/stocks', getAllStocks);
router.get('/stocks/:filter', getMatchingStocks);

module.exports = router;

