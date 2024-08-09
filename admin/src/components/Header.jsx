import React from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  const getActiveClass = (path) =>
    location.pathname === path ? "border-b-2 border-green-600" : "";

  return (
    <header className="bg-gray-800 text-white p-4 flex flex-wrap mb-7 justify-center space-x-4 lg:space-x-6">
      <Link to="/" className={`hover:text-green-400 ${getActiveClass("/")}`}>
        Add Travel Company
      </Link>
      <Link
        to="/edit-travel-company"
        className={`hover:text-green-400 ${getActiveClass(
          "/edit-travel-company"
        )}`}
      >
        Edit Travel Company
      </Link>
      <Link
        to="/delete-travel-company"
        className={`hover:text-green-400 ${getActiveClass(
          "/delete-travel-company"
        )}`}
      >
        Delete Travel Company
      </Link>
      <Link
        to="/add-bus"
        className={`hover:text-green-400 ${getActiveClass("/add-bus")}`}
      >
        Add Bus
      </Link>
      <Link
        to="/delete-bus"
        className={`hover:text-green-400 ${getActiveClass("/delete-bus")}`}
      >
        Delete Bus
      </Link>
      <Link
        to="/add-route"
        className={`hover:text-green-400 ${getActiveClass("/add-route")}`}
      >
        Add Route
      </Link>
      <Link
        to="/delete-route"
        className={`hover:text-green-400 ${getActiveClass("/delete-route")}`}
      >
        Delete Route
      </Link>
      <Link
        to="/add-schedule"
        className={`hover:text-green-400 ${getActiveClass("/add-schedule")}`}
      >
        Add Schedules
      </Link>
      <Link
        to="/delete-schedule"
        className={`hover:text-green-400 ${getActiveClass("/delete-schedule")}`}
      >
        Delete Schedule
      </Link>
    </header>
  );
};

export default Header;
