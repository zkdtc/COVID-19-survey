// Creating our Survey table
module.exports = function(sequelize, DataTypes) {
  const Survey = sequelize.define("Survey", {
    name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(1000),
      allowNull: false
    }
  });
  Survey.associate = function(models) {
    Survey.hasMany(models.Question, {
      onDelete: "cascade"
    });
  };

  return Survey;
};
