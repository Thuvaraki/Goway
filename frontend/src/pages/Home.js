import { Button, Select } from "flowbite-react";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [startStations, setStartStations] = useState([]);
  const [toStations, setToStations] = useState([]);
  const [sideBarData, setSideBarData] = useState({
    fromStation: "",
    toStation: "",
  });

  const todayDate = new Date().toISOString().split("T")[0];

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
        // console.log(data.stations);
        const Stations = data.stations.map((station) => station.name);
        setStartStations(Stations);
        setToStations(Stations);
      } catch (error) {
        console.error("Error fetching stations:", error);
      }
    };
    fetchStations();
  }, []);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setSideBarData((prevData) => ({
      ...prevData,
      journeyDate: today,
      fromStation: startStations.length > 0 ? startStations[0] : "",
      toStation: toStations.length > 0 ? toStations[1] : "",
    }));
  }, [startStations, toStations]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setSideBarData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    console.log("sideBarData:", sideBarData);
    navigate(
      `/search?fromStation=${encodeURIComponent(
        sideBarData.fromStation
      )}&toStation=${encodeURIComponent(
        sideBarData.toStation
      )}&journeyDate=${encodeURIComponent(sideBarData.journeyDate)}`
    );
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-gradient-to-r from-green-300 via-green-200 to-green-100">
      <div
        className="min-h-screen w-full flex flex-col"
        style={{
          position: "relative",
          width: "100%",
          minHeight: "70vh",
        }}
      >
        <div
          className="text-3xl text-left mt-20 ml-4 md:ml-16 px-4 md:px-20 text-green-700 font-bold"
          style={{ position: "relative", zIndex: "1" }}
        >
          The simplest way to book your bus tickets in Sri Lanka
        </div>
        <div
          className="flex items-center justify-center mt-6 w-full px-4 md:px-0"
          style={{ position: "relative", zIndex: "1" }}
        >
          <form
            className="flex flex-col md:flex-row bg-green-100 h-auto md:h-28 w-full max-w-5xl rounded-md items-center p-4 shadow-md"
            onSubmit={handleSearch}
          >
            <div className="flex-1 p-5 w-full">
              <Select
                className="w-full md:w-60"
                id="fromStation"
                value={sideBarData.fromStation}
                onChange={handleChange}
              >
                {startStations.map((station, index) => (
                  <option key={index} value={station}>
                    {station}
                  </option>
                ))}
              </Select>
            </div>
            <div className="flex-1 p-5 w-full">
              <Select
                className="w-full md:w-60"
                id="toStation"
                value={sideBarData.toStation}
                onChange={handleChange}
              >
                {toStations.map((station, index) => (
                  <option key={index} value={station}>
                    {station}
                  </option>
                ))}
              </Select>
            </div>
            <div className="flex-1 p-5 w-full">
              <input
                type="date"
                id="journeyDate"
                className="rounded-md w-full"
                value={sideBarData.journeyDate}
                onChange={handleChange}
                min={todayDate} // Set the minimum date to today, so able to avoid past dates
              />
            </div>
            <div className="p-2 w-full md:w-auto">
              <Button type="submit" className="bg-green-500 w-full">
                Find Buses
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
