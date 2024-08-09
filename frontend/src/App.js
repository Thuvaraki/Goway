import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Booking from "./pages/Booking";
import BookingConfirmation from "./pages/BookingConfirmation";
import Success from "./pages/Success";
import CancelBooking from "./pages/CancelBooking";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/seats/:id" element={<Booking />} />
        <Route path="/booking-confirmation" element={<BookingConfirmation />} />
        <Route path="/success" element={<Success />} />
        <Route path="/cancelBooking" element={<CancelBooking />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
