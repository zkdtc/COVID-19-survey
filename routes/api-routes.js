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
      // include: [
      //   {
      //     model: db.Choice // This will use the foreign key automatically to "join" the results
      //   }
      // ],
      raw: true
    })
      .then(questions => {
        questions.forEach(async question => {
          Choices = await db.Choice.findAll({
            where: {
              QuestionId: question.id
            },
            raw: true
          });
          console.log(Choices);
          const temp = [];
          for (i = 0; i < Choices.length; i++) {
            temp.push(Choices.text);
          }
          console.log(temp);
          question.Choices = Choices;
        });
        console.log("quessss==>>>", questions);
        res.render("index", questions);
      })
      .catch(err => {
        console.log("errrrrrr==>>>", err);
      });
    //questions = [{ text: "Abc", Choices: ["A", "B", "C"] }];
  });

  // respondent id
  // answers

  // Team - this is the section we need to discuss.  we have separate pages for posting; start and questions.
  app.post("/api/answers", (req, res) => {
    console.log("/api/answers");
    console.log(req.body);

    // Save the data to the database here
    db.Respondent.create({
      email: req.body.email,
      name: req.body.name,
      age: req.body.age
    })
      .then(respondent => {
        // the first time the respondent asnwers, the below will create the joined table
        respondent.addAnswer(1); //associate the respondent with answer(id=1)
        /*answer.addRespondent(1);
        db.Respondent.addAnswer(respondentId, answerId);
        db.Answer.addRespondent(answerId, respondentId);*/
        console.log("Good");
        // we need to change the line below to a "Thank You" page, or a page that shows the results after answering the survey
        res.redirect(307, "/api/questions");
      })
      .catch(err => {
        res.status(401).json(err);
      });
  });
};
