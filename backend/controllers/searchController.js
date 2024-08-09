import routeModel from "../models/route.js";
import scheduleModel from "../models/schedule.js";
import moment from "moment";
import scheduleSeatAvailabilityModel from "../models/schedule_seat_availability.js";

const getAvailableBuses = async (req, res) => {
  const {
    fromStation,
    toStation,
    journeyDate,
    busTypes,
    priceMin,
    priceMax,
    departureTimes,
    busPartner,
    boardingPoints,
    droppingPoints,
  } = req.body;

  try {
    const routes = await routeModel.find({
      boardingPoints: { $elemMatch: { point: fromStation } },
      droppingPoints: { $elemMatch: { point: toStation } },
    });

    if (!routes.length) {
      return res.status(404).json({ error: "Route not found" });
    }

    const routeIds = routes.map((route) => route._id);
    const journeyDay = moment(journeyDate).format("dddd");
    const today = moment().format("YYYY-MM-DD");
    const currentTime = moment().format("HH:mm:ss");

    let scheduleQuery = {
      schedules: {
        $elemMatch: {
          routeId: { $in: routeIds },
          days: journeyDay,
        },
      },
    };

    const schedules = await scheduleModel
      .find(scheduleQuery)
      .populate({
        path: "schedules.routeId",
        model: "route",
      })
      .populate({
        path: "busId",
        model: "bus",
        populate: {
          path: "travel_company_id",
          model: "travelCompany",
        },
      });

    if (!schedules.length) {
      return res
        .status(404)
        .json({ error: "No schedules found for this route" });
    }

    const availableBuses = await Promise.all(
      schedules.map(async (schedule) => {
        let isValidBus = true;

        if (schedule.schedules.length === 0 || !schedule.schedules[0].routeId) {
          isValidBus = false;
        } else {
          const departureTime = moment(
            schedule.schedules[0].routeId.departureTime,
            "HH:mm:ss"
          );

          if (moment(journeyDate).isSame(today, "day")) {
            if (!departureTime.isAfter(moment(currentTime, "HH:mm:ss"))) {
              isValidBus = false;
            }
          }

          if (priceMin !== undefined && priceMax !== undefined) {
            if (
              schedule.schedules[0].routeId.ticketPrice < priceMin ||
              schedule.schedules[0].routeId.ticketPrice > priceMax
            ) {
              isValidBus = false;
            }
          }

          if (busTypes && busTypes.length) {
            isValidBus = isValidBus && busTypes.includes(schedule.busId.type);
          }

          if (busPartner && busPartner.length) {
            isValidBus =
              isValidBus &&
              busPartner.includes(
                schedule.busId.travel_company_id.company_name
              );
          }

          if (boardingPoints && boardingPoints.length) {
            const scheduleBoardingPoints =
              schedule.schedules[0].routeId.boardingPoints.map(
                (bp) => bp.point
              );
            isValidBus =
              isValidBus &&
              boardingPoints.some((point) =>
                scheduleBoardingPoints.includes(point)
              );
          }

          if (droppingPoints && droppingPoints.length) {
            const scheduleDroppingPoints =
              schedule.schedules[0].routeId.droppingPoints.map(
                (dp) => dp.point
              );
            isValidBus =
              isValidBus &&
              droppingPoints.some((point) =>
                scheduleDroppingPoints.includes(point)
              );
          }

          if (departureTimes && departureTimes.length) {
            let withinTimeRange = false;

            departureTimes.forEach((time) => {
              if (
                time === "Before 10 AM" &&
                departureTime.isBefore(moment("10:00", "HH:mm"))
              ) {
                withinTimeRange = true;
              }
              if (
                time === "10 AM-5 PM" &&
                departureTime.isBetween(
                  moment("10:00", "HH:mm"),
                  moment("17:00", "HH:mm")
                )
              ) {
                withinTimeRange = true;
              }
              if (
                time === "05 PM-11 PM" &&
                departureTime.isBetween(
                  moment("17:00", "HH:mm"),
                  moment("23:00", "HH:mm")
                )
              ) {
                withinTimeRange = true;
              }
              if (
                time === "After 11 PM" &&
                departureTime.isAfter(moment("23:00", "HH:mm"))
              ) {
                withinTimeRange = true;
              }
            });

            isValidBus = isValidBus && withinTimeRange;
          }
        }

        if (isValidBus) {
          const seatAvailabilities = await scheduleSeatAvailabilityModel.find({
            scheduleId: schedule._id,
            date: new Date(journeyDate),
          });

          const seatCapacity = schedule.busId.seatCapacity || 0;

          const unavailableSeats = seatAvailabilities
            .flatMap((availability) =>
              availability.seatStatusLayout.filter((seat) => !seat.isAvailable)
            )
            .map((seat) => seat.seatNumber);

          console.log("unavailableSeats", unavailableSeats);

          return {
            fromStation: fromStation,
            toStation: toStation,
            journeyDate: journeyDate,
            scheduleId: schedule._id,
            routeId: schedule.schedules[0].routeId._id,
            ticketPrice: schedule.schedules[0].routeId.ticketPrice,
            departureTime: schedule.schedules[0].routeId.departureTime,
            arrivalTime: schedule.schedules[0].routeId.arrivalTime,
            busId: schedule.busId._id,
            busNumber: schedule.busId.busNumber,
            seatCapacity: schedule.busId.seatCapacity,
            availableSeats: seatCapacity - unavailableSeats.length,
            unavailableSeats,
            type: schedule.busId.type,
            amenities: schedule.busId.amenities,
            busPartner: schedule.busId.travel_company_id.company_name,
            startLocation: schedule.schedules[0].routeId.startLocation,
            endLocation: schedule.schedules[0].routeId.endLocation,
            duration: schedule.schedules[0].routeId.duration,
            distance: schedule.schedules[0].routeId.distance,
            boardingPoints: schedule.schedules[0].routeId.boardingPoints,
            droppingPoints: schedule.schedules[0].routeId.droppingPoints,
          };
        }

        return null;
      })
    );

    return res.status(200).json(availableBuses);
  } catch (error) {
    console.error("Error in getAvailableBuses: ", error);
    return res.status(500).json({ error: error.message });
  }
};

export { getAvailableBuses };
