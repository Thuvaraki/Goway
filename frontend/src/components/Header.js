import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-white shadow-md px-4 md:px-6 lg:px-20">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center p-4">
        <div className="flex items-center mb-4 md:mb-0">
          <Link to="/">
            <img src="/logo.jpg" alt="logo" className="h-10 w-auto" />
          </Link>
        </div>

        <div className="flex items-center">
          <Link to="/cancelBooking">
            <button className="bg-[#0f6447] text-white py-1 px-2 rounded hover:bg-[#0e5840] transition-colors duration-300">
              Cancel Booking
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
