module.exports = (sequelize, DataTypes) => {
  const Request = sequelize.define('Request', {
    number: {
      type: DataTypes.STRING(7),
      allowNull: false
    },
    issueDate: {
      type: DataTypes.DATEONLY
    },
    applicant: {
      type: DataTypes.STRING
    },
    authorizer: {
      type: DataTypes.STRING
    },
    comments: {
      type: DataTypes.STRING
    }
  }, {
    timestamps: false
  })
  return Request
}
