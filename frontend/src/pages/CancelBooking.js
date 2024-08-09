import React, { useState } from "react";
import axios from "axios";

const CancelBooking = () => {
  const [bookingConfirmationCode, setBookingConfirmationCode] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    setBookingConfirmationCode(event.target.value);
  };

  const handleCancelBooking = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:4000/api/booking/cancel-booking",
        {
          bookingConfirmationCode,
        }
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg mt-20">
      <form onSubmit={handleCancelBooking}>
        <label className="block text-lg font-medium mb-2">
          Enter your booking confirmation code
        </label>
        <input
          type="text"
          value={bookingConfirmationCode}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-[#0f6447] text-white py-1 px-2 mt-5 rounded hover:bg-[#0e5840] transition-colors duration-300"
        >
          Cancel Booking
        </button>
      </form>
      {message && (
        <p className="mt-4 text-center text-lg text-red-500">{message}</p>
      )}
    </div>
  );
};

export default CancelBooking;
