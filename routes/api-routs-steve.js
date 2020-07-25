// Requiring our models and passport as we've configured it
const db = require("../models");
​
module.exports = function(app) {
  const exphbs = require("express-handlebars");
  app.engine("handlebars", exphbs({ defaultLayout: "main" }));
  app.set("view engine", "handlebars");
  console.log("api");
  app.post("/api/start", (req, res) => {
    console.log("/api/start");
    console.log(req.body);
​
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
​
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
​
  // Route for logging user out
  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });
​
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
​
  app.get("/api/chartAnswer", (req, res) => {
    db.Answer.findAll({}).then(results => {
      res.json(results);
    });
  });
​
  app.get("/api/chartQuestion", (req, res) => {
    db.Question.findAll({}).then(results => {
      res.json(results);
    });
  });
​
  app.get("/api/chartChoice", (req, res) => {
    db.Choice.findAll({}).then(results => {
      res.json(results);
    });
  });
​
  app.get("/api/questionsChoices", (req, res) => {
    db.Question.findAll({
      include: [
        {
          model: db.Choice,
          as: "Choices"
        }
      ]
    }).then(results => {
      res.json(results);
    });
  });
​
  app.get("/api/questions", (req, res) => {
    db.Question.findAll({
      include: [
        {
          model: db.Choice,
          as: "Choices"
        }
      ]
    })
      .then(async questions => {
        const mappedQuestions = questions.map(q => q.toJSON());
        res.render("index", mappedQuestions);
      })
      .catch(err => {
        console.log("errrrrrr==>>>", err);
      });
  });
​
  app.post("/api/answers", async (req, res) => {
    try {
      console.log("/api/answers");
      console.log("req bodyy==>>>", req.body);
      const { email, answers } = req.body;
      const respondent = await db.Respondent.findOne({
        where: {
          email
        }
      });
      const createdAnswers = await Promise.all(
        answers.map(item => {
          return db.Answer.create({
            QuestionId: item.questionId,
            ChoiceId: item.choiceId,
            RespondentId: respondent.id,
            text: item.text
          });
        })
      );
      res.status(201).send(createdAnswers);
    } catch (err) {
      console.log("errr occurred==>>>>", err);
    }
  });
};