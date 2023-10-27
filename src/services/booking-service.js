const { BookingRepository } = require("../repository/index");
const axios = require("axios");
const {
  FLIGHT_SERVICE_BASE_URL,
  FLIGHT_AUTH_BASE_URL,
} = require("../config/serverConfig");
const { ServiceErrors } = require("../utils/errors/index");

const { createChannel, publishMessage } = require("../utils/messageQueue");
const { REMINDER_BINDING_KEY } = require("../config/serverConfig");

class BookingService {
  constructor() {
    this.bookingRepository = new BookingRepository();
  }

  async createBooking(data) {
    try {
      const flightId = data.flightId;
      const getFlightURL = `${FLIGHT_SERVICE_BASE_URL}/api/v1/flights/${flightId}`;
      const response = await axios.get(getFlightURL);
      // console.log("FLIGHTDATA", response);
      const flightData = response.data.data;
      let priceOfFlight = flightData.price;
      if (data.noOfSeats > flightData.totalSeats) {
        throw new ServiceErrors(
          "Something went wrong in the Booking Process",
          "Insufficient Seats in the Flight"
        );
      }
      const userId = data.userId;
      const userURL = `${FLIGHT_AUTH_BASE_URL}/api/v1/user/${userId}`;
      const user = await axios.get(userURL);
      const userEmail = user.data.data.email;
      // console.log(user.data.data.email);
      const totalCost = priceOfFlight * data.noOfSeats;
      const bookingPayload = { ...data, totalCost };
      const booking = await this.bookingRepository.create(bookingPayload);
      const updateFlightReqURL = `${FLIGHT_SERVICE_BASE_URL}/api/v1/flights/${booking.flightId}`;
      await axios.patch(updateFlightReqURL, {
        totalSeats: flightData.totalSeats - booking.noOfSeats,
      });

      const channel = await createChannel();
      const payload = {
        data: {
          subject: "This is a Notification from Booking Service",
          content:
            "Hello World, I'm from Booking Service. Vishnu Ganivada Mouli",
          recipientEmail: userEmail,
          notificationTime: "2023-10-26T15:40:00+05:30",
        },
        service: "CREATE_TICKET",
      };
      publishMessage(channel, REMINDER_BINDING_KEY, JSON.stringify(payload));
      const finalBooking = await this.bookingRepository.update(booking.id, {
        status: "Booked",
      });
      return finalBooking;
    } catch (error) {
      if (
        error.name == "Repository Layer Error" ||
        error.name == "ValidationError"
      ) {
        throw error;
      }
      throw new ServiceErrors();
    }
  }
}

module.exports = BookingService;
