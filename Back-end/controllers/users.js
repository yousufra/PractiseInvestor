const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const { generateToken } = require('../generateToken');
require('dotenv').config();

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200);
    res.send(users);
  } catch (error) {
    res.status(500);
    res.send(error);
  }
};

exports.createUser = async (req, res) => {
  try {
    const user = await User.findOne({userName: req.body.userName});
    if(user){
      return res.status(400).send({message: 'username taken, chose another one'});
    }
    const salt = await bcrypt.genSalt();//adds salt infront of hashed password to make it harder to hack in case of same passwords
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newUser= await User.create({userName:req.body.userName, password: hashedPassword});
    res.status(201);
    res.send(newUser);
  } catch (error) {
    res.status(500);
    res.send(error);
  }
};

exports.getUser = async (req, res) => {
  try {
    const {username} = req.params;
    const user = await User.findOne({userName: username});
    res.status(200);
    res.send(user);
  } catch (error) {
    res.status(500);
    res.send(error);
  }
}

exports.login = async (req, res) => {
  const user = await User.findOne({userName: req.body.userName});
  if (!user) return res.status(400).send({message: 'Cannot find user'});
  try {
    if (await bcrypt.compare(req.body.password, user.password)){
      res.status(200).send(
        {
          _id: user._id,
          userName: user.userName,
          password: user.password,
          token: generateToken(user)
        });
    } else {
      res.status(400).send({message: 'Wrong password'});
    }
  } catch (error) {
    res.status(500);
    res.send(error);
  }
}