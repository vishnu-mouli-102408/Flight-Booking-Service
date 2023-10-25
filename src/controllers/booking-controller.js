const { BookingService } = require("../services/index");
const { StatusCodes } = require("http-status-codes");

const bookingService = new BookingService();

const create = async (req, res) => {
  try {
    const response = await bookingService.createBooking(req.body);
    // console.log("BOOKINGCONTROLLER", response);
    return res.status(StatusCodes.OK).json({
      data: response,
      success: true,
      message: "Successfully completed Booking",
      err: {},
    });
  } catch (error) {
    return res.status(error.statusCodes).json({
      data: {},
      success: false,
      message: error.message,
      err: error.explanation,
    });
  }
};

module.exports = {
  create,
};
