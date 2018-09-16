const express                 = require('express');
const apiRouter               = express.Router();
const Item                    = require('../models/item');
//===========================================>
// const session                 = require('express-session')
// const passport                = require('passport')
// const LocalStrategy           = require('passport-local').Strategy;
// const flash                   = require('connect-flash');
// const ensureLoggedIn          = require('connect-ensure-login').ensureLoggedIn;
const mongoose                  = require('mongoose');

//===========================================>




apiRouter.post('/item/create',/*ensureLoggedIn('/'),*/(req, res, next)=>{
  const itemTitle                   = req.body.title;
  const itemStartYear               = req.body.startYear;
  const itemEndYear                 = req.body.endYear;
  const itemLocation                = req.body.location;
  const itemDescription             = req.body.description;
  
  
  console.log(itemTitle, itemStartYear, itemEndYear, itemLocation, itemDescription)

  if (!itemTitle||!itemStartYear||!itemEndYear||!itemLocation||!itemDescription) {
      res.status(400).json({ message: 'Please fill out all the fields.'});
      return;
    } //closed
    
  Item.findOne({ itemTitle }, 'itemTitle', (err, thereIsAnItemThatAlreadyExists) => {
      if(thereIsAnItemThatAlreadyExists) {
        res.status(400).json({ message: 'The item already exists' });
        return;
      }

  Item.create({
      title: itemTitle,
      startYear: itemStartYear,
      endYear: itemEndYear,
      location: itemLocation,
      description: itemDescription
  })
  .then((TheItemIsSuccessfullyCreatedAndSaved)=>{
    res.json(TheItemIsSuccessfullyCreatedAndSaved);
  })
  .catch((ohNoAnErrorHappened)=>{
    next(ohNoAnErrorHappened);
  });
});
})




























apiRouter.get('/item/allitems', (req, res, next) => {
  Item.find()
  .then((allTheItemsInTheDbCollection)=>{
    res.json(allTheItemsInTheDbCollection);
  })
  .catch((theErrorThatCausedThisToFail)=>{
    res.json(theErrorThatCausedThisToFail);
  })
});



module.exports = apiRouter;
