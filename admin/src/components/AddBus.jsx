import React, { useState } from "react";

const AddBus = () => {
  const [formData, setFormData] = useState({
    busNumber: "",
    seatCapacity: "",
    type: "",
    amenities: "",
    travel_company_id: "",
    seatLayout: {
      leftSideSeatLayout: [],
      rightSideSeatLayout: [],
      lastRowSeatLayout: [],
    },
  });

  const [result, setResult] = useState(null);

  const [showSeatInputs, setShowSeatInputs] = useState(null);
  const [newSeat, setNewSeat] = useState({
    seatNumber: "",
    isEnable: true,
    type: "",
    rowNum: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "amenities") {
      setFormData({
        ...formData,
        [name]: value.split(",").map((item) => item.trim()),
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSeatChange = (e) => {
    const { name, value } = e.target;
    setNewSeat({ ...newSeat, [name]: value });
  };

  const handleAddSeat = (section) => {
    setFormData({
      ...formData,
      seatLayout: {
        ...formData.seatLayout,
        [section]: [...formData.seatLayout[section], newSeat],
      },
    });
    setNewSeat({
      seatNumber: "",
      isEnable: true,
      type: "",
      rowNum: "",
    });
    setShowSeatInputs(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/api/bus/add-bus", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (response.ok) {
        setResult({
          busNumber: result.bus.busNumber,
          id: result.bus._id,
        });
        setFormData({
          busNumber: "",
          seatCapacity: "",
          type: "",
          amenities: "",
          travel_company_id: "",
          seatLayout: {
            leftSideSeatLayout: [],
            rightSideSeatLayout: [],
            lastRowSeatLayout: [],
          },
        });
      } else {
        console.log(result);
        alert("An error occurred");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-6 text-green-500">
        Add Bus Details
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="busNumber">
            Bus Number
          </label>
          <input
            type="text"
            name="busNumber"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
            value={formData.busNumber}
            onChange={handleChange}
            placeholder="Enter bus number"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="seatCapacity">
            Seat Capacity
          </label>
          <input
            type="text"
            name="seatCapacity"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
            value={formData.seatCapacity}
            onChange={handleChange}
            placeholder="Enter total seat numbers"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="type">
            Type
          </label>
          <input
            type="text"
            name="type"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
            value={formData.type}
            onChange={handleChange}
            placeholder="AC or Non-AC"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="amenities">
            Amenities (comma separated)
          </label>
          <input
            type="text"
            name="amenities"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
            value={formData.amenities}
            onChange={handleChange}
            placeholder="Charging, AC"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="travel_company_id">
            Travel Company Id
          </label>
          <input
            type="text"
            name="travel_company_id"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
            value={formData.travel_company_id}
            onChange={handleChange}
            placeholder="Enter your travel Company ID"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="seatLayout">
            Seat Layout
          </label>
          <div className="flex flex-wrap gap-4 mb-4">
            <button
              type="button"
              onClick={() => setShowSeatInputs("leftSideSeatLayout")}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
            >
              Add Left Side Seat
            </button>
            <button
              type="button"
              onClick={() => setShowSeatInputs("rightSideSeatLayout")}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
            >
              Add Right Side Seat
            </button>
            <button
              type="button"
              onClick={() => setShowSeatInputs("lastRowSeatLayout")}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
            >
              Add Last Row Seat
            </button>
          </div>

          {showSeatInputs && (
            <div className="space-y-4">
              <div className="mb-4">
                <label className="block text-gray-700" htmlFor="seatNumber">
                  Seat Number
                </label>
                <input
                  type="text"
                  name="seatNumber"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  value={newSeat.seatNumber}
                  onChange={handleSeatChange}
                  placeholder="Enter seat number"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700" htmlFor="type">
                  Type
                </label>
                <input
                  type="text"
                  name="type"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  value={newSeat.type}
                  onChange={handleSeatChange}
                  placeholder="Enter seat type (e.g :  window, aisle, middle, 2nd from left side, 2nd from right side)"
                />
              </div>
              {showSeatInputs !== "lastRowSeatLayout" && (
                <div className="mb-4">
                  <label className="block text-gray-700" htmlFor="rowNum">
                    Row Number
                  </label>
                  <input
                    type="text"
                    name="rowNum"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    value={newSeat.rowNum}
                    onChange={handleSeatChange}
                    placeholder="Enter row number"
                  />
                </div>
              )}
              <button
                type="button"
                onClick={() => handleAddSeat(showSeatInputs)}
                className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md"
              >
                Add Seat
              </button>
            </div>
          )}
        </div>

        <button className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md shadow-lg transition duration-300">
          Add Bus
        </button>
      </form>

      {result && (
        <div className="mt-6 p-4 bg-gray-100 border border-gray-300 rounded-md shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800">Bus Added</h3>
          <p className="mt-2 text-gray-700">
            <strong>Bus Number:</strong> {result.busNumber}
          </p>
          <p className="mt-1 text-gray-700">
            <strong>ID:</strong> {result.id}
          </p>
        </div>
      )}
    </div>
  );
};

export default AddBus;
