const { BookingService } = require("../services/index");
const { StatusCodes } = require("http-status-codes");

// const { createChannel, publishMessage } = require("../utils/messageQueue");
// const { REMINDER_BINDING_KEY } = require("../config/serverConfig");

const bookingService = new BookingService();

// class BookingController {
//   constructor() {
//     this.bookingService = new BookingService();
//   }

// async sendMessageToQueue(req, res) {
//   try {
//     const channel = await createChannel();
//     const payload = {
//       data: {
//         subject: "This is a Notification from Queue",
//         content: "Some Content",
//         recipientEmail: "vishnumouli1@gmail.com",
//         notificationTime: "2023-10-26T15:40:00+05:30",
//       },
//       service: "CREATE_TICKET",
//     };
//     publishMessage(channel, REMINDER_BINDING_KEY, JSON.stringify(payload));
//     return res.status(200).json({
//       message: "Successfully Published the event",
//     });
//   } catch (error) {
//     console.log(error);
//   }
// }

const create = async (req, res) => {
  try {
    console.log(req.body);
    const response = await bookingService.createBooking(req.body);
    // console.log("BOOKINGCONTROLLER", response);
    return res.status(StatusCodes.OK).json({
      data: response,
      success: true,
      message: "Successfully completed Booking",
      err: {},
    });
  } catch (error) {
    console.log("Booking error", error);
    return res.status(error.statusCodes).json({
      data: {},
      success: false,
      message: error.message,
      err: error.explanation,
    });
  }
};
// }

module.exports = {
  create,
};
