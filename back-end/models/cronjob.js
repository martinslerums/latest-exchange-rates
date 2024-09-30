module.exports = (sequelize, DataTypes) => {
  const CronJob = sequelize.define('CronJob', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    lastRunDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  });

  return CronJob;
};
