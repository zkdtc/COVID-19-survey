// Requiring our models and passport as we've configured it
const db = require("../models");

module.exports = function(app) {
  const exphbs = require("express-handlebars");
  app.engine("handlebars", exphbs({ defaultLayout: "main" }));
  app.set("view engine", "handlebars");
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
    // res.json(req.body)
    /*db.Respondent.findOne({
      where: {
        email: localStorage.getItem("email")
      }
    }).then(function(results) {
      console.log("Respondent Results===>")
      res.json(results);
    });

    // Save the data to the database here
    db.Answer.create({
      // each of the radio buttons has a 'name' attribute
      // for eaxmple:
      // <input type="radio" class="form-check-input" name="2">
      // in the above case, the answer is for question 2
      // ...
      // also, i want to put the radio buttton text value in the db.Answer.text column
      QuestionId: req.body.?,
      ChoiceId: req.body.?,
      RespondentId: req.body.?
      text: req.body.?
    })
      .then(respondent => {
        // the first time the respondent asnwers, the below will create the joined table
        respondent.addAnswer(1); //associate the respondent with answer(id=1)
        answer.addRespondent(1);
        db.Respondent.addAnswer(respondentId, answerId);
        db.Answer.addRespondent(answerId, respondentId);
        console.log("Good");
        // we need to change the line below to a "Thank You" page, or a page that shows the results after answering the survey
        res.redirect(307, "/api/questions");
      })
      .catch(err => {
        res.status(401).json(err);
      });*/
  });
};
