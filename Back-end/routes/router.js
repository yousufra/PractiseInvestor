const Router = require('express').Router;
const router = Router();

//import controller functions
const {getAllUsers, createUser, getUser, login} = require('../controllers/users')

//HTTP requests (get, post, put, delete)


//users/user
router.get('/users', getAllUsers) //get all users
router.get('/users/:username', getUser)//get Single User
router.post('/users', createUser) //when new account is created
router.post('/users/login', login);


//when user buys/sells a holding
//router.put('/users/:user', updateUser)//when user adds/deletes a holding affects cash, investments, activities,
//req.body = {date, company, action, quanitity, price} //basically sends the acitivty


//to be able to get the ranking
//router.get('/users/ranking', getRanking)


module.exports = router;

//PUT => If user can update all or just a portion of the record
//PATCH => If user can only update a partial record