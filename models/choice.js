// Creating our Survey table
module.exports = function(sequelize, DataTypes) {
  const Choice = sequelize.define("Choice", {
    text: {
      type: DataTypes.STRING(510),
      allowNull: false
    }
  });

  Choice.associate = function(models) {
    Choice.belongsTo(models.Question, {
      foreignKey: {
        allowNull: false
      }
    });
    Choice.belongsToMany(models.Answer, {
      through: "AnswerChoices"
    });
  };
  return Choice;
};
