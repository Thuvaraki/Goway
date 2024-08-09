import React, { useState } from "react";
import { Link } from "react-router-dom";

const BookingForm = ({
  scheduleId,
  journeyDate,
  selectedSeats,
  boardingPoints,
  droppingPoints,

  ticketPrice,
}) => {
  const [formData, setFormData] = useState({
    scheduleId: scheduleId,
    seatNumbers: selectedSeats,
    journeyDate: journeyDate,
    passengerName: "",
    mobileNumber: "",
    email: "",
    boardingPlace: "",
    destinationPlace: "",
    gender: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-6 text-green-600">
        Booking Details
      </h2>
      <form>
        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="passengerName">
            Passenger Name
          </label>
          <input
            type="text"
            id="passengerName"
            name="passengerName"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
            value={formData.passengerName}
            onChange={handleChange}
            placeholder="Enter passenger name"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="mobileNumber">
            Mobile Number
          </label>
          <input
            type="text"
            id="mobileNumber"
            name="mobileNumber"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
            value={formData.mobileNumber}
            onChange={handleChange}
            placeholder="071 234 5678"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="email">
            Email (Optional)
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
            value={formData.email}
            onChange={handleChange}
            placeholder="user@domain.com"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="gender">
            Gender
          </label>
          <select
            id="gender"
            name="gender"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select gender
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="boardingPlace">
            Boarding Place
          </label>
          <select
            id="boardingPlace"
            name="boardingPlace"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
            value={formData.boardingPlace}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select your boarding point
            </option>
            {boardingPoints.map((point) => (
              <option key={point._id} value={point.point}>
                {point.point}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="destinationPlace">
            Destination Place
          </label>
          <select
            id="destinationPlace"
            name="destinationPlace"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
            value={formData.destinationPlace}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select your destination point
            </option>
            {droppingPoints.map((point) => (
              <option key={point._id} value={point.point}>
                {point.point}
              </option>
            ))}
          </select>
        </div>

        <Link
          to={`/booking-confirmation`}
          state={{
            formData,
            ticketPrice,
            journeyDate,
            selectedSeats,
          }}
        >
          <button className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md shadow-lg transition duration-300">
            Book Seats
          </button>
        </Link>
      </form>
    </div>
  );
};

export default BookingForm;
