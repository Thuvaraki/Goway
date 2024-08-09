import React from "react";
import { Link } from "react-router-dom";

export default function PostCard({ bus = {} }) {
  const {
    fromStation,
    toStation,
    journeyDate,
    scheduleId,
    amenities,
    arrivalTime,
    busNumber,
    busId,
    busPartner,
    departureTime,
    boardingPoints,
    droppingPoints,
    duration,
    endLocation,
    startLocation,
    ticketPrice,
    type,
    availableSeats,
    unavailableSeats,
  } = bus;

  const renderDropdownItems = (items) => {
    return items.map((item, index) => (
      <option key={index} value={item.point}>
        {item.point} - {item.time}
      </option>
    ));
  };

  return (
    <div className="group relative border border-gray-300 overflow-hidden rounded-lg transition-all md:w-4/5 p-6 flex flex-col bg-white shadow-lg">
      <div className="flex flex-col gap-0">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <span className="text-lg font-bold">{busPartner}</span>
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-2">
          <div className="flex items-center gap-1">
            <img src="/bus.png" className="w-5 h-6 mr-2" alt="Bus icon" />
            <span className="font-semibold text-md text-yellow-400">
              {type}
            </span>
          </div>
          <div className="flex items-center gap-1 mt-2 sm:mt-0">
            <span className="text-green-700 font-semibold text-lg">
              Rs.{ticketPrice}
            </span>
          </div>
        </div>
        <span>busNumber : {busNumber}</span>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-2">
          <div className="flex items-center gap-1">
            <span className="font-semibold ml-16">{departureTime}</span>
            <span className="ml-4">
              <img
                src="/rightArrow.png"
                className="w-10 h-7 mx-2"
                alt="Arrow icon"
              />
            </span>
            <span className="font-semibold ml-3">{arrivalTime}</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-2">
        <div className="flex items-center gap-1">
          <span className="font-semibold text-sm text-slate-500 ml-12">
            {startLocation}
          </span>
          <span className="font-semibold text-sm text-slate-500 mx-4">
            {duration}
          </span>
          <span className="font-semibold text-sm text-slate-500">
            {endLocation}
          </span>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-2">
        <div className="flex items-center gap-1">
          <select className="border border-gray-300 rounded-md px-2 py-1">
            <option value="">Amenities</option>
            {amenities.map((amenity, index) => (
              <option key={index} value={amenity}>
                {amenity}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-2">
        <div className="flex items-center gap-1">
          <select className="border border-gray-300 rounded-md px-2 py-1">
            <option value="">Boarding Points</option>
            {renderDropdownItems(boardingPoints)}
          </select>
        </div>
        <div className="flex items-center gap-1">
          <select className="border border-gray-300 rounded-md px-2 py-1">
            <option value=""> Dropping Points</option>
            {renderDropdownItems(droppingPoints)}
          </select>
        </div>
        <div className="flex items-center gap-1">
          <span className="font-semibold text-slate-500 text-sm">
            Available Seat: {availableSeats}
          </span>
        </div>
        <Link
          to={`/seats/${busNumber}`}
          state={{
            busId,
            unavailableSeats,
            fromStation,
            toStation,
            journeyDate,
            scheduleId,
            boardingPoints,
            droppingPoints,
            ticketPrice,
          }}
        >
          <button className="bg-green-500 text-white px-4 py-2 rounded">
            View Seats
          </button>
        </Link>
      </div>
    </div>
  );
}
