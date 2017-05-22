 // Load required packages
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Coffee = require('./models/coffee');

// Connect to the Coffeelocker MongoDB
mongoose.connect('mongodb://192.168.99.100:27017/coffeelocker');

// Create our Express application
var app = express();

// Use the body-parser package in our application
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// Use environment defined port or 3000
var port = process.env.PORT || 3000;

// Create our Express router
var router = express.Router();

// Initial dummy route for testing
// http://localhost:3000/api
router.get('/', function(req, res) {
  res.json({ message: 'You are running dangerously low on coffee!' }); 
});

// Create a new route with the prefix /coffees
var coffeesRoute = router.route('/coffees');

// Create endpoint /api/Coffees for POSTS
coffeesRoute.post(function(req, res) {
  // Create a new instance of the Coffee model
  var coffee = new Coffee();

  // Set the Coffee properties that came from the POST data
  coffee.name = req.body.name;
  coffee.type = req.body.type;
  coffee.quantity = req.body.quantity;

  // Save the Coffee and check for errors
  coffee.save(function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'Coffee added to the locker!', data: coffee });
  });
});

// Create endpoint /api/Coffees for GET
coffeesRoute.get(function(req, res) {
  // Use the Coffee model to find all Coffee
  coffee.find(function(err, coffees) {
    if (err)
      res.send(err);

    res.json(Coffees);
  });
});

// Create a new route with the /coffees/:coffee_id prefix
var coffeeRoute = router.route('/coffees/:coffee_id');

// Create endpoint /api/Coffees/:Coffee_id for GET
coffeeRoute.get(function(req, res) {
  // Use the Coffee model to find a specific coffee
  Coffee.findById(req.params.coffee_id, function(err, coffee) {
    if (err)
      res.send(err);

    res.json(coffee);
  });
});

// Create endpoint /api/Coffees/:Coffee_id for PUT
coffeeRoute.put(function(req, res) {
  // Use the Coffee model to find a specific Coffee
  Coffee.findById(req.params.coffee_id, function(err, coffee) {
    if (err)
      res.send(err);

    // Update the existing Coffee quantity
    coffee.quantity = req.body.quantity;

    // Save the Coffee and check for errors
    coffee.save(function(err) {
      if (err)
        res.send(err);

      res.json(Coffee);
    });
  });
});

// Create endpoint /api/coffees/:coffee_id for DELETE
coffeeRoute.delete(function(req, res) {
  // Use the Coffee model to find a specific coffee and remove it
  Coffee.findByIdAndRemove(req.params.coffee_id, function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'Coffee removed from the locker!' });
  });
});

// Register all our routes with /api
app.use('/api', router);

// Start the server
app.listen(port);
console.log('Insert coffee on port ' + port);
