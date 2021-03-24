const validationService = {
  validateInput: (queryObject) => {
    if (
      !queryObject.date ||
      !parseInt(queryObject.date) ||
      !new Date(queryObject.date)
    ) {
      throw { errorCode: 101, msg: "Invalid Date Format", data: {} };
    }
    if (new Date(parseInt(queryObject.date)) > new Date()) {
      throw { errorCode: 102, msg: "Date cannot be in future", data: {} };
    }
  },
};

module.exports = validationService;
