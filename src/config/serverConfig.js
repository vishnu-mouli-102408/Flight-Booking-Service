const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  PORT: process.env.PORT,
  FLIGHT_SERVICE_BASE_URL: process.env.FLIGHT_SERVICE_BASE_URL,
  FLIGHT_AUTH_BASE_URL: process.env.FLIGHT_AUTH_BASE_URL,
  EXCHANGE_NAME: process.env.EXCHANGE_NAME,
  REMINDER_BINDING_KEY: process.env.REMINDER_BINDING_KEY,
  MESSAGE_BROKER_URL: process.env.MESSAGE_BROKER_URL,
};
