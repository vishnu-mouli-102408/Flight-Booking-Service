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

  async update(bookingId, data) {
    try {
      const booking = await Booking.findByPk(bookingId);
      if (data.status) {
        booking.status = data.status;
      }
      await booking.save();
      return booking;
      // const response = await Booking.update(data, {
      //   where: {
      //     id: bookingId,
      //   },
      //   returning: true,
      // });
      // return response;
    } catch (error) {
      throw new AppErrors(
        "Repository Layer Error",
        "Cannot Update Booking",
        "There was some issue Updating the booking, Please try again.",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}

module.exports = BookingRepository;
