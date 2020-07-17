// Creating our Survey table
module.exports = function(sequelize, DataTypes) {
  const Respondent = sequelize.define("Respondent", {
    name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      isEmail: true
    }
  });

  Respondent.associate = function(models) {
    Respondent.belongsToMany(models.Answer, {
      through: "AnswerRespondents"
    });
  };
  return Respondent;
};
