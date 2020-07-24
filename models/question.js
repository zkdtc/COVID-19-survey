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
      foreignKey: {
        allowNull: false
      }
    });

    Question.hasMany(models.Choice, {
      as: "Choices",
      foreignKey: {
        allowNull: false,
        onDelete: "cascade"
      }
    });

    Question.hasMany(models.Answer, {
      foreignKey: {
        allowNull: false,
        onDelete: "cascade"
      }
    });
  };
  return Question;
};
