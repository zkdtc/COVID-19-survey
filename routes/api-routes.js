// Requiring our models and passport as we've configured it
const db = require("../models");

module.exports = function(app) {
  console.log("api");
  app.post("/api/start", (req, res) => {
    console.log("/api/start");
    console.log(req.body);

    // Save the data to the database here
    db.Respondent.create({
      email: req.body.email,
      name: req.body.name,
      age: req.body.age
    })
      .then(() => {
        console.log("Good");
        res.redirect(307, "/api/questions");
      })
      .catch(err => {
        res.status(401).json(err);
      });
  });

  app.post("/api/questions", (req, res) => {
    console.log("/api/questions");
    console.log(req.body);

    // Retrieve a list of questions from the QuestionDB here
    // db.Question.
    questions={};
    // Then render the handlebar using the questions
    db.Respondent.create({
      email: req.body.email,
      name: req.body.name,
      age: req.body.age
    })
      .then(() => {
        console.log("Good");
        res.redirect(307, "/api/questions");
      })
      .catch(err => {
        res.status(401).json(err);
      });
  });
  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/finish", (req, res) => {
    db.User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(() => {
        res.redirect(307, "/api/login");
      })
      .catch(err => {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });

  // GET route for getting all of the questions
  app.get("/api/questions", function(req, res) {
    // findAll returns all entries for a table when used with no options
    db.question.findAll({}).then(function(dbquestion) {
      // We have access to the questions as an argument inside of the callback function
      res.json(dbquestion);
    });
    res.render("index", { questions: dbquestion });
  });

  app.get("/api/choices", function(req, res) {
    // findAll returns all entries for a table when used with no options
    db.choices.findAll({}).then(function(dbchoices) {
      // We have access to the choices as an argument inside of the callback function
      res.json(dbchoices);
    });
    res.render("index", { choices: dbchoices });
  });

   // GET route for getting all of the choices
   app.get("/api/questions", function(req, res) {
    // findAll returns all entries for a table when used with no options
    db.question.findAll({}).then(function(dbquestion) {
      // We have access to the questions as an argument inside of the callback function
      res.json(dbquestion);
    });
    res.render("index", { questions: dbquestion });
  });

  app.get("/api/choices", function(req, res) {
    // findAll returns all entries for a table when used with no options
    db.choices.findAll({}).then(function(dbchoices) {
      // We have access to the choices as an argument inside of the callback function
      res.json(dbchoices);
    });
    res.render("index", { choices: dbchoices });
  });
};
