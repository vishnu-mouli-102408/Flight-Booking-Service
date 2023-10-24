const { StatusCodes } = require("http-status-codes");

class ValidationErrors extends Error {
  constructor(error) {
    super();
    let explanation = [];
    error.errors.forEach((err) => {
      explanation.push(err.message);
    });
    this.name = "ValidationError";
    this.message = "Not able to Validate the data sent in the request";
    this.explanation = explanation;
    this.statusCodes = StatusCodes.BAD_REQUEST;
  }
}

module.exports = ValidationErrors;
