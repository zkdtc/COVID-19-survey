// Requiring our models and passport as we've configured it
const db = require("../models");
const path = require("path");

module.exports = function(app) {
  const exphbs = require("express-handlebars");
  app.engine("handlebars", exphbs({ defaultLayout: "main" }));
  app.set("view engine", "handlebars");
  app.post("/api/start", (req, res) => {
    // Save the data to the database here
    db.Respondent.create({
      email: req.body.email,
      name: req.body.name,
      age: req.body.age
    })
      .then(() => {
        console.log("Good");
        res.redirect("/api/questions");
      })
      .catch(err => {
        res.status(401).json(err);
      });
  });

  app.get("/finish", (req, res) => {
    console.log(path.join(__dirname, "../public/finish.html"));
    console.log("send");
    res.sendFile(path.join(__dirname, "../public/finish.html"));
  });

  // Route for logging user out
  app.get("/charts", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/charts.html"));
  });

  // Route for logging user out
  app.get("/exit", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  app.get("/api/chartAnswer", (req, res) => {
    db.Answer.findAll({}).then(results => {
      res.json(results);
    });
  });

  app.get("/api/chartQuestion", (req, res) => {
    db.Question.findAll({}).then(results => {
      res.json(results);
    });
  });

  app.get("/api/chartChoice", (req, res) => {
    db.Choice.findAll({}).then(results => {
      res.json(results);
    });
  });

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

  // Team - this is the section we need to discuss.  we have separate pages for posting; start and questions.
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
      console.log("respondent");
      console.log(respondent);
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
      console.log("createAnswers");
      console.log(createdAnswers);
      //res.status(201).send(createdAnswers);
      //res.json(createdAnswers);
      res.redirect("/finish");
    } catch (err) {
      console.log("errr occurred==>>>>", err);
    }
  });
};
