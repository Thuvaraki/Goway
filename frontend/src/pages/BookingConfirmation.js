import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function BookingConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const { formData, ticketPrice, journeyDate, selectedSeats } =
    location.state || {};

  console.log(formData);

  const totalPrice = selectedSeats.length * ticketPrice;
  const generateCode = () => {
    return Math.floor(1000 + Math.random() * 9000);
  };

  const [code] = useState(generateCode);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bookingDetails = {
      scheduleId: formData.scheduleId,
      passengerName: formData.passengerName,
      mobileNumber: formData.mobileNumber,
      email: formData.email,
      boardingPoint: formData.boardingPlace,
      droppingPoint: formData.destinationPlace,
      gender: formData.gender,
      seatNumbers: selectedSeats,
      dateOfJourney: journeyDate,
      fare: totalPrice,
      bookingConfirmationCode: code,
    };

    try {
      const response = await fetch(
        "http://localhost:4000/api/booking/new-booking",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookingDetails),
        }
      );

      if (!response.ok) {
        throw new Error("Booking failed. Please try again.");
      }

      const result = await response.json();
      console.log("Booking successful:", result);
      navigate("/success", { state: { bookingConfirmationCode: code } });
    } catch (error) {
      console.error("Booking error:", error.message);
      alert(error.message);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-6">Booking Confirmation</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="passengerName">
            Passenger Name
          </label>
          <input
            type="text"
            id="passengerName"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
            value={formData?.passengerName || ""}
            readOnly
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="mobileNumber">
            Mobile Number
          </label>
          <input
            type="text"
            id="mobileNumber"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
            value={formData?.mobileNumber || ""}
            readOnly
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="journeyDate">
            Journey Date
          </label>
          <input
            type="text"
            id="journeyDate"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
            value={journeyDate || ""}
            readOnly
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="selectedSeats">
            Selected Seats
          </label>
          <input
            type="text"
            id="selectedSeats"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
            value={selectedSeats.join(", ") || ""}
            readOnly
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="email">
            Email (Optional)
          </label>
          <input
            type="email"
            id="email"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
            value={formData?.email || ""}
            readOnly
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="gender">
            Gender
          </label>
          <input
            type="text"
            id="gender"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
            value={formData?.gender || ""}
            readOnly
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="boardingPlace">
            Boarding Place
          </label>
          <input
            type="text"
            id="boardingPlace"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
            value={formData?.boardingPlace || ""}
            readOnly
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="destinationPlace">
            Destination Place
          </label>
          <input
            type="text"
            id="destinationPlace"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
            value={formData?.destinationPlace || ""}
            readOnly
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="destinationPlace">
            Total price
          </label>
          <input
            type="text"
            id="totalPrice"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
            value={totalPrice}
            readOnly
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md shadow-lg transition duration-300"
        >
          Confirm Booking
        </button>
      </form>
    </div>
  );
}

export default BookingConfirmation;
