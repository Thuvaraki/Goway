import bookingModel from "../models/booking.js";
import scheduleSeatAvailabilityModel from "../models/schedule_seat_availability.js";
import scheduleModel from "../models/schedule.js";
import mongoose from "mongoose";

const bookBus = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const {
      scheduleId,
      seatNumbers,
      dateOfJourney,
      passengerName,
      mobileNumber,
      email,
      boardingPoint,
      droppingPoint,
      gender,
      bookingConfirmationCode,
    } = req.body;

    let seatAvailability = await scheduleSeatAvailabilityModel
      .findOne({
        scheduleId,
        date: dateOfJourney,
        "seatStatusLayout.seatNumber": { $in: seatNumbers },
      })
      .session(session);

    if (!seatAvailability) {
      seatAvailability = new scheduleSeatAvailabilityModel({
        scheduleId,
        date: dateOfJourney,
        seatStatusLayout: seatNumbers.map((seatNumber) => ({
          seatNumber,
          isAvailable: true,
          bookingId: null,
        })),
      });

      await seatAvailability.save({ session });
    } else {
      const unavailableSeats = seatAvailability.seatStatusLayout.filter(
        (seat) => seatNumbers.includes(seat.seatNumber) && !seat.isAvailable
      );

      if (unavailableSeats.length > 0) {
        throw new Error("Seats already booked");
      }
    }

    const schedule = await scheduleModel
      .findById(scheduleId)
      .populate("schedules.routeId")
      .session(session);

    if (!schedule) {
      throw new Error("Schedule not found");
    }

    const ticketPrice = schedule.schedules[0].routeId.ticketPrice;
    const fare = seatNumbers.length * ticketPrice;

    const newBooking = new bookingModel({
      scheduleId,
      seatNumbers,
      fare,
      dateOfJourney,
      passengerName,
      mobileNumber,
      email,
      boardingPoint,
      droppingPoint,
      gender,
      bookingConfirmationCode,
    });

    const savedBooking = await newBooking.save({ session });

    await scheduleSeatAvailabilityModel.updateOne(
      {
        scheduleId,
        date: dateOfJourney,
        "seatStatusLayout.seatNumber": { $in: seatNumbers },
      },
      {
        $set: {
          "seatStatusLayout.$[elem].isAvailable": false,
          "seatStatusLayout.$[elem].bookingId": savedBooking._id,
        },
      },
      {
        arrayFilters: [{ "elem.seatNumber": { $in: seatNumbers } }],
        session,
      }
    );

    await session.commitTransaction();
    session.endSession();

    res.status(201).json(savedBooking);
  } catch (error) {
    console.error("Transaction error:", error);
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ message: error.message });
  }
};

//cancel booking
const cancelBooking = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { bookingConfirmationCode } = req.body;
    const booking = await bookingModel.findOne({ bookingConfirmationCode });

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    booking.bookingStatus = "canceled";
    await booking.save({ session });

    await scheduleSeatAvailabilityModel.updateOne(
      {
        scheduleId: booking.scheduleId,
        date: booking.dateOfJourney,
        "seatStatusLayout.seatNumber": { $in: booking.seatNumbers },
      },
      {
        $set: {
          "seatStatusLayout.$[elem].isAvailable": true,
          "seatStatusLayout.$[elem].bookingId": null,
        },
      },
      {
        arrayFilters: [{ "elem.seatNumber": { $in: booking.seatNumbers } }],
        session,
      }
    );

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({ message: "Booking canceled successfully" });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ message: error.message });
  }
};

export { bookBus, cancelBooking };
