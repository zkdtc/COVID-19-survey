const db = require("../models");

db.Survey.create({
  name: "COVID-19",
  description: "Survey to make scientific study of COVID-19 impact"
});

db.Question.create({
  text: "Who are you?",
  SurveyId: 1
});

db.Choice.create({
  text: "A",
  QuestionId: 3
});
db.Choice.create({
  text: "B",
  QuestionId: 3
});
db.Choice.create({
  text: "C",
  QuestionId: 3
});
