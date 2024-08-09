import React, { useState } from "react";

const BusSeatMap = ({
  seatLayout,
  unavailableSeats,
  onSeatSelection,
  selectedSeats,
}) => {
  const { leftSideSeatLayout, rightSideSeatLayout, lastRowSeatLayout } =
    seatLayout;

  // Determine the maximum number of rows
  const maxRows = Math.max(
    leftSideSeatLayout[leftSideSeatLayout.length - 1]?.rowNum || 0,
    rightSideSeatLayout[rightSideSeatLayout.length - 1]?.rowNum || 0
  );

  // Group seats by row
  const createRows = (sideLayout) => {
    const rows = Array.from({ length: maxRows }, () => []);
    sideLayout.forEach((seat) => {
      rows[seat.rowNum - 1].push(seat);
    });
    return rows;
  };

  const leftRows = createRows(leftSideSeatLayout);
  const rightRows = createRows(rightSideSeatLayout);

  return (
    <div className="bus-seat-map ">
      <div className="side-seats">
        {leftRows.map((row, rowIndex) => (
          <div className="seat-row" key={`row-${rowIndex}`}>
            <div className="row-side left-side">
              {row.map((seat) => (
                <div
                  onClick={() => onSeatSelection(seat)}
                  key={seat._id}
                  className={`seat ${seat.type} ${
                    seat.isEnable ? "enabled" : "disabled"
                  } ${
                    unavailableSeats.includes(seat.seatNumber)
                      ? "unavailable"
                      : ""
                  }${
                    selectedSeats.includes(seat.seatNumber) ? "selected" : ""
                  }`}
                >
                  {seat.seatNumber}
                </div>
              ))}
            </div>
            <div className="row-side right-side">
              {rightRows[rowIndex] &&
                rightRows[rowIndex].map((seat) => (
                  <div
                    onClick={() => onSeatSelection(seat)}
                    key={seat._id}
                    className={`seat ${seat.type} ${
                      seat.isEnable ? "enabled" : "disabled"
                    } ${
                      unavailableSeats.includes(seat.seatNumber)
                        ? "unavailable"
                        : ""
                    }
                    ${
                      selectedSeats.includes(seat.seatNumber) ? "selected" : ""
                    }`}
                  >
                    {seat.seatNumber}
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
      <div className="last-row">
        {lastRowSeatLayout.map((seat) => (
          <div
            onClick={() => onSeatSelection(seat)}
            key={seat._id}
            className={`seat last-row-seat ${seat.type} ${
              seat.isEnable ? "enabled" : "disabled"
            } ${
              unavailableSeats.includes(seat.seatNumber) ? "unavailable" : ""
            }${selectedSeats.includes(seat.seatNumber) ? "selected" : ""}`}
          >
            {seat.seatNumber}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BusSeatMap;
