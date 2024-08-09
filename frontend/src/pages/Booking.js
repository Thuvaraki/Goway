import React, { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import BusDetail from "../components/BusDetail";
import BookingForm from "../components/BookingForm";

function Booking() {
  const location = useLocation();
  const {
    busId,
    unavailableSeats,
    fromStation,
    toStation,
    journeyDate,
    scheduleId,
    boardingPoints,
    droppingPoints,
    ticketPrice,
  } = location.state || {};

  console.log("id", busId);

  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSeatSelection = (seat) => {
    setSelectedSeats((prevSelectedSeats) => {
      const seatNumber = seat.seatNumber;
      if (prevSelectedSeats.includes(seatNumber)) {
        return prevSelectedSeats.filter((num) => num !== seatNumber);
      } else {
        return [...prevSelectedSeats, seatNumber];
      }
    });
  };

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex justify-center mb-5 mt-5">
        <div className="flex flex-col items-center">
          <p className="text-green-600 font-semibold">
            {fromStation} - {toStation}
          </p>
          <p className="text-green-600 font-semibold">&nbsp;{journeyDate}</p>
        </div>
      </div>
      <div className="flex flex-col md:flex-row flex-1">
        <div className="flex-1 md:w-1/3 p-4">
          <BusDetail
            busId={busId}
            unavailableSeats={unavailableSeats}
            onSeatSelection={handleSeatSelection}
            selectedSeats={selectedSeats}
          />
        </div>
        <div className="flex-1 md:w-1/3 p-4">
          <BookingForm
            scheduleId={scheduleId}
            journeyDate={journeyDate}
            boardingPoints={boardingPoints}
            droppingPoints={droppingPoints}
            selectedSeats={selectedSeats}
            ticketPrice={ticketPrice}
          />
        </div>
        <div className="flex-1 md:w-1/3 p-4 bg-gray-100">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-green-500 rounded-md"></div>
            <p className="ml-2 ">Available</p>
          </div>
          <div className="flex items-center mt-5">
            <div className="w-10 h-10 bg-gray-400 rounded-md"></div>
            <p className="ml-2 ">Already booked</p>
          </div>
          <div className="flex items-center mt-5">
            <div className="w-10 h-10 bg-blue-400 rounded-md"></div>
            <p className="ml-2 ">Selected seats</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Booking;
