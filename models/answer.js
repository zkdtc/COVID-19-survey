// Creating our Survey table
module.exports = function(sequelize, DataTypes) {
  const Answer = sequelize.define("Answer", {
    text: {
      type: DataTypes.STRING(510),
      allowNull: false
    }
  });
  //   --------
  Answer.associate = function(models) {
    Answer.belongsToMany(models.Respondent, {
      // creating relationship tables 'on the fly' when you use through
      through: "AnswerRespondents"
    });
    Answer.belongsTo(models.Question, {
      as: "question",
      foreignKey: {
        allowNull: false
      }
    });
    /*Answer.belongsToMany(models.Choice, {
      // creating relationship tables 'on the fly' when you use through

      through: "AnswerChoices"
    });*/
  };
  return Answer;
};
