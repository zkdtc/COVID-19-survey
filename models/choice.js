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
        allowNull: false,
        onDelete: "cascade"
      }
    });

    Choice.hasMany(models.Answer, {
      foreignKey: {
        allowNull: false,
        onDelete: "cascade"
      }
    });

    /*Choice.belongsToMany(models.Answer, {
      through: "AnswerChoices"
    });*/
  };
  return Choice;
};
