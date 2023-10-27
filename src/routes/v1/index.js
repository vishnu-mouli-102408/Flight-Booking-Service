const express = require("express");

const router = express.Router();

// const { createChannel } = require("../../utils/messageQueue");

// const channel = await createChannel();

const { BookingController } = require("../../controllers/index");

// const bookingController = new BookingController();

router.post("/bookings", BookingController.create);
// router.post("/publish", bookingController.sendMessageToQueue);

module.exports = router;
