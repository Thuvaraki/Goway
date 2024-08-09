import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Select, TextInput } from "flowbite-react";
import PostCard from "../components/PostCard";
import { Range, getTrackBackground } from "react-range";

const MIN = 500;
const MAX = 5000;

export default function SearchBus() {
  const [sideBarData, setSideBarData] = useState({
    fromStation: "",
    toStation: "",
    journeyDate: "",
  });

  const [filters, setFilters] = useState({
    busTypes: [],
    priceMin: MIN,
    priceMax: MAX,
    departureTimes: [],
    busPartner: [],
    priceRange: [MIN, MAX],
  });

  const todayDate = new Date().toISOString().split("T")[0];

  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("departureTime");
  const [sortOrder, setSortOrder] = useState("asc");
  const [startStations, setStartStations] = useState([]);
  const [toStations, setToStations] = useState([]);
  const [busPartners, setBusPartners] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();

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
        setStartStations(stations || []);
        setToStations(stations || []);
      } catch (error) {
        console.error("Error fetching stations:", error);
      }
    };

    const fetchCompanies = async () => {
      try {
        const res = await fetch(
          "http://localhost:4000/api/travel-company/get-all-travel-companies"
        );
        if (!res.ok) {
          throw new Error("Failed to fetch companies");
        }
        const data = await res.json();
        const busPartners = data.map((busPartner) => busPartner.company_name);
        setBusPartners(busPartners || []);
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };

    fetchStations();
    fetchCompanies();
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const fromStation = urlParams.get("fromStation") || "";
    const toStation = urlParams.get("toStation") || "";
    const journeyDate =
      urlParams.get("journeyDate") || new Date().toISOString().split("T")[0];

    setSideBarData({
      fromStation: decodeURIComponent(fromStation),
      toStation: decodeURIComponent(toStation),
      journeyDate: journeyDate,
    });

    fetchBuses({
      fromStation: decodeURIComponent(fromStation),
      toStation: decodeURIComponent(toStation),
      journeyDate: journeyDate,
    });
  }, [location.search]);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const fromStation = urlParams.get("fromStation") || "";
    const toStation = urlParams.get("toStation") || "";
    const journeyDate =
      urlParams.get("journeyDate") || new Date().toISOString().split("T")[0];

    fetchBuses({
      fromStation: decodeURIComponent(fromStation),
      toStation: decodeURIComponent(toStation),
      journeyDate: journeyDate,
      busTypes: filters.busTypes,
      priceMin: filters.priceMin,
      priceMax: filters.priceMax,
      departureTimes: filters.departureTimes,
      busPartner: filters.busPartner,
    });
  }, [filters]);

  useEffect(() => {
    if (buses.length > 0) {
      const sortedBuses = sortBuses(buses);
      setBuses(sortedBuses);
    }
  }, [sortBy, sortOrder]);

  const fetchBuses = async (searchData) => {
    // console.log(searchData);
    setLoading(true);
    try {
      const response = await fetch(
        "http://localhost:4000/api/search/available-buses",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(searchData),
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      console.log(data);
      const filteredData = data.filter(
        (bus) => bus !== null && bus !== undefined
      );
      setBuses(filteredData);
    } catch (error) {
      console.error("Error fetching available buses:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setSideBarData({ ...sideBarData, [id]: value });
  };

  const handlePriceRangeChange = (values) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      priceRange: values,
      priceMin: values[0],
      priceMax: values[1],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("fromStation", encodeURIComponent(sideBarData.fromStation));
    urlParams.set("toStation", encodeURIComponent(sideBarData.toStation));
    urlParams.set("journeyDate", encodeURIComponent(sideBarData.journeyDate));
    navigate(`/search?${urlParams.toString()}`);
  };

  const buttonBaseClass =
    "flex items-center gap-1 bg-white border rounded-lg p-2 cursor-pointer";
  const buttonSelectedClass = "bg-green-100 border-green-800";

  const isSelected = (filterArray, value) => filterArray.includes(value);

  const handleSortChange = (criteria) => {
    if (criteria === sortBy) {
      setSortOrder((prevSortOrder) =>
        prevSortOrder === "asc" ? "desc" : "asc"
      );
    } else {
      setSortBy(criteria);
      setSortOrder("asc");
    }
  };

  const sortBuses = (buses) => {
    return buses.sort((a, b) => {
      if (sortBy === "departureTime") {
        const timeA = a.departureTime.split(":");
        const timeB = b.departureTime.split(":");
        return sortOrder === "asc"
          ? timeA[0] - timeB[0] || timeA[1] - timeB[1]
          : timeB[0] - timeA[0] || timeB[1] - timeA[1];
      } else if (sortBy === "arrivalTime") {
        const timeA = a.arrivalTime.split(":");
        const timeB = b.arrivalTime.split(":");
        return sortOrder === "asc"
          ? timeA[0] - timeB[0] || timeA[1] - timeB[1]
          : timeB[0] - timeA[0] || timeB[1] - timeA[1];
      } else if (sortBy === "rating") {
        return sortOrder === "asc" ? a.rating - b.rating : b.rating - a.rating;
      } else if (sortBy === "ticketPrice") {
        return sortOrder === "asc"
          ? a.ticketPrice - b.ticketPrice
          : b.ticketPrice - a.ticketPrice;
      } else if (sortBy === "availableSeats") {
        const seatsA = parseInt(a.availableSeats);
        const seatsB = parseInt(b.availableSeats);
        return sortOrder === "asc" ? seatsA - seatsB : seatsB - seatsA;
      }

      return 0;
    });
  };

  return (
    <div className="flex flex-col bg-slate-50">
      <div className="p-4 border-b flex flex-col md:flex-row justify-center items-center text-center bg-white shadow-lg rounded-lg ml-2 mr-2 mt-2">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col md:flex-row gap-4 md:gap-8 w-full max-w-4xl"
        >
          <div className="flex flex-col md:flex-row items-center gap-2 w-full">
            <label className="whitespace-nowrap font-cinzel font-bold text-green-800 text-lg">
              From :
            </label>
            <Select
              className="w-full md:w-60"
              id="fromStation"
              value={sideBarData.fromStation}
              onChange={handleChange}
            >
              <option value="">Select From Station</option>
              {startStations.map((station, index) => (
                <option key={index} value={station}>
                  {station}
                </option>
              ))}
            </Select>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-2 w-full">
            <label className="whitespace-nowrap font-cinzel font-bold text-green-800 text-lg">
              To :
            </label>
            <Select
              className="w-full md:w-60"
              id="toStation"
              value={sideBarData.toStation}
              onChange={handleChange}
            >
              <option value="">Select To Station</option>
              {toStations.map((station, index) => (
                <option key={index} value={station}>
                  {station}
                </option>
              ))}
            </Select>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-2 w-full">
            <label className="whitespace-nowrap font-cinzel font-bold text-green-800 text-lg">
              Date:
            </label>
            <TextInput
              className="w-full md:w-60"
              id="journeyDate"
              type="date"
              value={sideBarData.journeyDate}
              onChange={handleChange}
              min={todayDate}
            />
          </div>
          <div className="p-2 w-full md:w-auto">
            <Button type="submit" className="bg-green-500 w-full">
              Search
            </Button>
          </div>
        </form>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center bg-white p-4 font-cinzel rounded-lg border-spacing-2 shadow-lg ml-2 mr-2 border-gray-700 mt-2 ">
        <div className="flex items-center mb-2 sm:mb-0">
          <div className="text-lg font-bold mr-5">Sort By:</div>
          <div className="flex gap-4">
            <button
              className={`px-4 py-2 border border-gray-300 rounded-lg ${
                sortBy === "departureTime" ? "bg-blue-200" : ""
              }`}
              onClick={() => handleSortChange("departureTime")}
            >
              Departure Time
              {sortBy === "departureTime" && (
                <span>{sortOrder === "asc" ? " ▲" : " ▼"}</span>
              )}
            </button>
            <button
              className={`px-4 py-2 border border-gray-300 rounded-lg ${
                sortBy === "arrivalTime" ? "bg-blue-200" : ""
              }`}
              onClick={() => handleSortChange("arrivalTime")}
            >
              Arrival Time
              {sortBy === "arrivalTime" && (
                <span>{sortOrder === "asc" ? " ▲" : " ▼"}</span>
              )}
            </button>
            <button
              className={`px-4 py-2 border border-gray-300 rounded-lg ${
                sortBy === "ticketPrice" ? "bg-blue-200" : ""
              }`}
              onClick={() => handleSortChange("ticketPrice")}
            >
              Price
              {sortBy === "ticketPrice" && (
                <span>{sortOrder === "asc" ? " ▲" : " ▼"}</span>
              )}
            </button>
            <button
              className={`px-4 py-2 border border-gray-300 rounded-lg ${
                sortBy === "availableSeats" ? "bg-blue-200" : ""
              }`}
              onClick={() => handleSortChange("availableSeats")}
            >
              Available Seats
              {sortBy === "availableSeats" && (
                <span>{sortOrder === "asc" ? " ▲" : " ▼"}</span>
              )}
            </button>
          </div>
        </div>
        <div className="flex items-center text-green-500">
          <img src="/bus.png" className="w-5 h-6 mr-2" alt="Bus icon" />
          <span className="text-lg font-semibold">
            {" "}
            Showing {buses.length} Buses on this Route{" "}
          </span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row mt-5">
        <div className="w-full md:w-1/4 p-4 border-r bg-white">
          <h2 className="text-2xl font-semibold mb-4">Filters</h2>
          <div className="flex flex-col gap-4">
            <div className="bg-gray-200 rounded-md mb-2 p-3">
              <h3 className="font-semibold mb-2">Price Range</h3>
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center mb-2">
                  <Range
                    step={100}
                    min={MIN}
                    max={MAX}
                    values={filters.priceRange}
                    onChange={handlePriceRangeChange}
                    renderTrack={({ props, children }) => (
                      <div
                        {...props}
                        style={{
                          ...props.style,
                          height: "6px",
                          width: "100%",
                          background: getTrackBackground({
                            values: filters.priceRange,
                            colors: ["#ccc", "#548BF4", "#ccc"],
                            min: MIN,
                            max: MAX,
                          }),
                        }}
                      >
                        {children}
                      </div>
                    )}
                    renderThumb={({ props }) => (
                      <div
                        {...props}
                        style={{
                          ...props.style,
                          height: "16px",
                          width: "16px",
                          borderRadius: "50%",
                          backgroundColor: "#548BF4",
                        }}
                      />
                    )}
                  />
                </div>
                <div className="flex justify-between">
                  <span>{filters.priceRange[0]}</span>
                  <span>{filters.priceRange[1]}</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-300 rounded-md mb-2 p-3">
              <h3 className="font-semibold mb-2">Bus Type</h3>
              <div className="flex gap-2">
                <button
                  className={`${buttonBaseClass} ${
                    isSelected(filters.busTypes, "Non-AC")
                      ? buttonSelectedClass
                      : "border-gray-300"
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    setFilters((prevFilters) => ({
                      ...prevFilters,
                      busTypes: isSelected(prevFilters.busTypes, "Non-AC")
                        ? prevFilters.busTypes.filter(
                            (type) => type !== "Non-AC"
                          )
                        : [...prevFilters.busTypes, "Non-AC"],
                    }));
                  }}
                >
                  Non-AC
                </button>
                <button
                  className={`${buttonBaseClass} ${
                    isSelected(filters.busTypes, "AC")
                      ? buttonSelectedClass
                      : "border-gray-300"
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    setFilters((prevFilters) => ({
                      ...prevFilters,
                      busTypes: isSelected(prevFilters.busTypes, "AC")
                        ? prevFilters.busTypes.filter((type) => type !== "AC")
                        : [...prevFilters.busTypes, "AC"],
                    }));
                  }}
                >
                  AC
                </button>
              </div>
            </div>
            <div className="bg-gray-300 rounded-md mb-2 p-3">
              <h3 className="font-semibold mb-2">Departure Time</h3>
              <div className="flex gap-2">
                <button
                  className={`${buttonBaseClass} ${
                    isSelected(filters.departureTimes, "Before 10 AM")
                      ? buttonSelectedClass
                      : "border-gray-300"
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    setFilters((prevFilters) => ({
                      ...prevFilters,
                      departureTimes: isSelected(
                        prevFilters.departureTimes,
                        "Before 10 AM"
                      )
                        ? prevFilters.departureTimes.filter(
                            (time) => time !== "Before 10 AM"
                          )
                        : [...prevFilters.departureTimes, "Before 10 AM"],
                    }));
                  }}
                >
                  Before 10 AM
                </button>
                <button
                  className={`${buttonBaseClass} ${
                    isSelected(filters.departureTimes, "10 AM-5 PM")
                      ? buttonSelectedClass
                      : "border-gray-300"
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    setFilters((prevFilters) => ({
                      ...prevFilters,
                      departureTimes: isSelected(
                        prevFilters.departureTimes,
                        "10 AM-5 PM"
                      )
                        ? prevFilters.departureTimes.filter(
                            (time) => time !== "10 AM-5 PM"
                          )
                        : [...prevFilters.departureTimes, "10 AM-5 PM"],
                    }));
                  }}
                >
                  10AM - 5PM
                </button>
                <button
                  className={`${buttonBaseClass} ${
                    isSelected(filters.departureTimes, "05 PM-11 PM")
                      ? buttonSelectedClass
                      : "border-gray-300"
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    setFilters((prevFilters) => ({
                      ...prevFilters,
                      departureTimes: isSelected(
                        prevFilters.departureTimes,
                        "05 PM-11 PM"
                      )
                        ? prevFilters.departureTimes.filter(
                            (time) => time !== "05 PM-11 PM"
                          )
                        : [...prevFilters.departureTimes, "05 PM-11 PM"],
                    }));
                  }}
                >
                  5PM - 11PM
                </button>
                <button
                  className={`${buttonBaseClass} ${
                    isSelected(filters.departureTimes, "After 11 PM")
                      ? buttonSelectedClass
                      : "border-gray-300"
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    setFilters((prevFilters) => ({
                      ...prevFilters,
                      departureTimes: isSelected(
                        prevFilters.departureTimes,
                        "After 11 PM"
                      )
                        ? prevFilters.departureTimes.filter(
                            (time) => time !== "After 11 PM"
                          )
                        : [...prevFilters.departureTimes, "After 11 PM"],
                    }));
                  }}
                >
                  After 11PM
                </button>
              </div>
            </div>
            <div className="bg-gray-300 rounded-md mb-2 p-3">
              <h3 className="font-semibold mb-2">Bus Partner</h3>
              <div className="flex gap-2 flex-wrap">
                {busPartners.map((busPartner, index) => (
                  <button
                    key={index}
                    className={`${buttonBaseClass} ${
                      isSelected(filters.busPartner, busPartner)
                        ? buttonSelectedClass
                        : "border-gray-300"
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      setFilters((prevFilters) => ({
                        ...prevFilters,
                        busPartner: isSelected(
                          prevFilters.busPartner,
                          busPartner
                        )
                          ? prevFilters.busPartner.filter(
                              (partner) => partner !== busPartner
                            )
                          : [...prevFilters.busPartner, busPartner],
                      }));
                    }}
                  >
                    {busPartner}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center">
          <div className="w-full md:w-5/6 px-4 bg-white">
            {loading ? (
              <p>Loading...</p>
            ) : buses.length > 0 ? (
              <div className="flex flex-col gap-4">
                {buses.map((bus, index) => (
                  <PostCard key={index} bus={bus} />
                ))}
              </div>
            ) : (
              <div className="w-full flex justify-center mt-40 text-red-600 font-bold text-lg">
                Sorry... No buses available
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
