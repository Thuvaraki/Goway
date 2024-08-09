import React, { useState, useEffect } from "react";

const AddRoute = () => {
  const [formData, setFormData] = useState({
    startLocation: "",
    endLocation: "",
    duration: "",
    travel_company_id: "",
    ticketPrice: "",
    departureTime: "",
    arrivalTime: "",
    boardingPoints: [],
    droppingPoints: [],
  });

  const [stations, setStations] = useState([]);
  const [showPointInputs, setShowPointInputs] = useState(null);
  const [currentPoint, setCurrentPoint] = useState({
    point: "",
    time: "",
  });
  const [result, setResult] = useState(null);

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const res = await fetch(
          "http://localhost:4000/api/stations/get-stations"
        );
        if (!res.ok) {
          throw new Error("Failed to fetch stations");
        }
        const data = await res.json();
        const stations = data.stations.map((station) => station.name);
        setStations(stations);
      } catch (error) {
        console.error("Error fetching stations:", error);
      }
    };
    fetchStations();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePointChange = (e) => {
    const { name, value } = e.target;
    setCurrentPoint({ ...currentPoint, [name]: value });
  };

  const handleAddPoint = () => {
    if (showPointInputs === "boardingPoints") {
      setFormData({
        ...formData,
        boardingPoints: [...formData.boardingPoints, currentPoint],
      });
    } else if (showPointInputs === "droppingPoints") {
      setFormData({
        ...formData,
        droppingPoints: [...formData.droppingPoints, currentPoint],
      });
    }
    setCurrentPoint({ point: "", time: "" });
    setShowPointInputs(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:4000/api/route/add-route",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const result = await response.json();
      if (response.ok) {
        setResult({
          id: result.newRoute._id,
        });
        setFormData({
          startLocation: "",
          endLocation: "",
          duration: "",
          travel_company_id: "",
          ticketPrice: "",
          departureTime: "",
          arrivalTime: "",
          boardingPoints: [],
          droppingPoints: [],
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
      <h2 className="text-2xl font-semibold mb-6 text-green-500">Add Route</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="startLocation">
            Start Location
          </label>
          <select
            name="startLocation"
            value={formData.startLocation}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
          >
            <option value="">Select start location</option>
            {stations.map((station) => (
              <option key={station} value={station}>
                {station}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="endLocation">
            End Location
          </label>
          <select
            name="endLocation"
            value={formData.endLocation}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
          >
            <option value="">Select end location</option>
            {stations.map((station) => (
              <option key={station} value={station}>
                {station}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="duration">
            Duration
          </label>
          <input
            type="text"
            name="duration"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
            value={formData.duration}
            onChange={handleChange}
            placeholder="Enter the duration of journey"
            required
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
            placeholder="Enter the travel company ID"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="ticketPrice">
            Ticket Price
          </label>
          <input
            type="text"
            name="ticketPrice"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
            value={formData.ticketPrice}
            onChange={handleChange}
            placeholder="Enter the ticket price"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="departureTime">
            Departure Time
          </label>
          <input
            type="text"
            name="departureTime"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
            value={formData.departureTime}
            onChange={handleChange}
            placeholder="21:00:00"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="arrivalTime">
            Arrival Time
          </label>
          <input
            type="text"
            name="arrivalTime"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
            value={formData.arrivalTime}
            onChange={handleChange}
            placeholder="05:00:00"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">
            Boarding points & Dropping Points
          </label>
          <div className="flex flex-wrap gap-4 mb-4">
            <button
              type="button"
              onClick={() => setShowPointInputs("boardingPoints")}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
            >
              Add Boarding Point
            </button>
            <button
              type="button"
              onClick={() => setShowPointInputs("droppingPoints")}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
            >
              Add Dropping Point
            </button>
          </div>

          {showPointInputs && (
            <div className="space-y-4">
              <div className="mb-4">
                <label className="block text-gray-700" htmlFor="point">
                  Select Point
                </label>
                <select
                  name="point"
                  value={currentPoint.point}
                  onChange={handlePointChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                >
                  {stations.map((station) => (
                    <option key={station} value={station}>
                      {station}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700" htmlFor="time">
                  Time
                </label>
                <input
                  type="text"
                  name="time"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                  value={currentPoint.time}
                  onChange={handlePointChange}
                  placeholder="21:10 PM"
                />
              </div>

              <button
                type="button"
                onClick={handleAddPoint}
                className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md"
              >
                Add Point
              </button>
            </div>
          )}
        </div>

        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md"
        >
          Add Route
        </button>
      </form>

      {result && (
        <div className="mt-6 p-4 bg-gray-100 border border-gray-300 rounded-md shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800">
            Route added successfully!
          </h3>
          <p> ID: {result.id}</p>
        </div>
      )}
    </div>
  );
};

export default AddRoute;
