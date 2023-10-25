const { BookingRepository } = require("../repository/index");
const axios = require("axios");
const { FLIGHT_SERVICE_BASE_URL } = require("../config/serverConfig");
const { ServiceErrors } = require("../utils/errors/index");

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
      const totalCost = priceOfFlight * data.noOfSeats;
      const bookingPayload = { ...data, totalCost };
      const booking = await this.bookingRepository.create(bookingPayload);
      const updateFlightReqURL = `${FLIGHT_SERVICE_BASE_URL}/api/v1/flights/${booking.flightId}`;
      await axios.patch(updateFlightReqURL, {
        totalSeats: flightData.totalSeats - booking.noOfSeats,
      });
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
