import React, { useState, useEffect } from "react";
import BusSeatMap from "./BusSeatMap";

const BusDetail = ({
  busId,
  unavailableSeats,
  onSeatSelection,
  selectedSeats,
}) => {
  const [bus, setBus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBusData = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/api/bus/get-bus/${busId}`
        );
        if (!response.ok) {
          throw new Error("Response was not ok");
        }
        const data = await response.json();
        setBus(data);
      } catch (error) {
        console.error("Error fetching bus data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBusData();
  }, [busId]);

  if (loading) return <p>Loading bus details...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {bus ? (
        <BusSeatMap
          seatLayout={bus.seatLayout}
          unavailableSeats={unavailableSeats || []}
          onSeatSelection={onSeatSelection}
          selectedSeats={selectedSeats}
        />
      ) : (
        <p>No bus data available.</p>
      )}
    </div>
  );
};

export default BusDetail;
