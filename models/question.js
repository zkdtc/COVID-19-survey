// Creating our Survey table
module.exports = function(sequelize, DataTypes) {
  const Question = sequelize.define("Question", {
    text: {
      type: DataTypes.STRING(510),
      allowNull: false
    }
  });

  Question.associate = function(models) {
    Question.belongsTo(models.Survey, {
      as: "survey",
      foreignKey: {
        allowNull: false
      }
    });

    Question.hasMany(models.Choice, {
      as: "choices"
    });

    Question.hasMany(models.Answer, {
      as: "answers"
    });
  };
  return Question;
};
