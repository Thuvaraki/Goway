import React from "react";
import { useLocation } from "react-router-dom";

function Success() {
  const location = useLocation();
  const { bookingConfirmationCode } = location.state;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-green-600 mb-4">
        Booking Successful!
      </h1>
      <h2 className="text-xl text-blue-500 mb-2">
        Pay while you are traveling
      </h2>
      <hr className="border-green-600 mt-2" />
      <h2 className="text-xl text-green-600 mb-6">
        Your booking confirmation code is :{" "}
        <strong>{bookingConfirmationCode}</strong>
      </h2>
    </div>
  );
}

export default Success;
