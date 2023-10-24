const { Booking } = require("../models/index");
const { ValidationErrors, AppErrors } = require("../utils/errors/index");

const { StatusCodes } = require("http-status-codes");

class BookingRepository {
  async create(data) {
    try {
      const booking = await Booking.create(data);
      return booking;
    } catch (error) {
      if ((error.name = "SequelizeValidationError")) {
        throw new ValidationErrors(error);
      }
      throw new AppErrors(
        "Repository Layer Error",
        "Cannot Create Booking",
        "There was some issue creating the booking, Please try again.",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}

module.exports = BookingRepository;
