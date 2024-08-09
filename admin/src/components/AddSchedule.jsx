import React, { useState } from "react";

const AddSchedule = () => {
  const [formData, setFormData] = useState({
    busId: "",
    schedules: [],
  });

  const [showScheduleInputs, setShowScheduleInputs] = useState(false);
  const [currentSchedule, setCurrentSchedule] = useState({
    routeId: "",
    days: [],
  });
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleScheduleChange = (e) => {
    const { name, value } = e.target;
    setCurrentSchedule({ ...currentSchedule, [name]: value });
  };

  const handleAddSchedule = () => {
    setFormData({
      ...formData,
      schedules: [...formData.schedules, currentSchedule],
    });
    setCurrentSchedule({ routeId: "", days: [] });
    setShowScheduleInputs(false);
  };

  const handleDaysChange = (e) => {
    const { value, checked } = e.target;
    setCurrentSchedule((prev) => ({
      ...prev,
      days: checked
        ? [...prev.days, value]
        : prev.days.filter((day) => day !== value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:4000/api/schedule/add-schedule",
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
          ScheduleId: result.newSchedule._id,
          busId: result.newSchedule.busId,
          schedules: result.newSchedule.schedules,
        });
        setFormData({
          busId: "",
          schedules: [],
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
        Add Schedule
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="busId">
            Bus Id
          </label>
          <input
            type="text"
            name="busId"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
            value={formData.busId}
            onChange={handleChange}
            placeholder="Enter Bus Id"
            required
          />
        </div>

        <div className="mb-4">
          <button
            type="button"
            onClick={() => setShowScheduleInputs(!showScheduleInputs)}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
          >
            Enter A Schedule
          </button>

          {showScheduleInputs && (
            <div className="space-y-4">
              <div className="mb-4">
                <label className="block text-gray-700" htmlFor="routeId">
                  Route Id
                </label>
                <input
                  type="text"
                  name="routeId"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                  value={currentSchedule.routeId}
                  onChange={handleScheduleChange}
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700" htmlFor="days">
                  Select Days
                </label>
                <div className="flex space-x-4">
                  {[
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                    "Sunday",
                  ].map((day) => (
                    <label key={day} className="inline-flex items-center">
                      <input
                        type="checkbox"
                        value={day}
                        checked={currentSchedule.days.includes(day)}
                        onChange={handleDaysChange}
                        className="form-checkbox"
                      />
                      <span className="ml-2">{day}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={handleAddSchedule}
                className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md"
              >
                Add Schedule
              </button>
            </div>
          )}
        </div>

        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md"
        >
          Finish Scheduling
        </button>
      </form>

      {result && (
        <div className="mt-6 p-4 bg-gray-100 border border-gray-300 rounded-md shadow-sm">
          <h3 className="text-lg font-semibold text-green-500">
            Schedule added successfully!
          </h3>

          <p>
            <strong>Schedule Id : </strong> {result.ScheduleId}
            <br />
          </p>
          <p>
            <strong>Bus Id : </strong> {result.busId}
            <br />
          </p>
          <p>
            <strong>Schedules</strong>
            {result.schedules.map((s, i) => (
              <div key={i}>
                <p>Route Id: {s.routeId}</p>

                <p>Days: {s.days.join(", ")}</p>

                <hr className="border-green-300 mt-2" />
              </div>
            ))}
          </p>
        </div>
      )}
    </div>
  );
};

export default AddSchedule;
