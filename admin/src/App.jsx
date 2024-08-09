import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import AddTravelCompany from "./components/AddTravelCompany";
import EditTravelCompany from "./components/EditTravelCompany";
import DeleteTravelCompany from "./components/DeleteTravelCompany";
import AddBus from "./components/AddBus";
import DeleteBus from "./components/DeleteBus";
import Header from "./components/Header";
import AddRoute from "./components/AddRoute";
import DeleteRoute from "./components/DeleteRoute";
import AddSchedule from "./components/AddSchedule";
import DeleteSchedule from "./components/DeleteSchedule";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<AddTravelCompany />} />
          <Route path="/edit-travel-company" element={<EditTravelCompany />} />
          <Route
            path="/delete-travel-company"
            element={<DeleteTravelCompany />}
          />
          <Route path="/add-bus" element={<AddBus />} />
          <Route path="/delete-bus" element={<DeleteBus />} />
          <Route path="/add-route" element={<AddRoute />} />
          <Route path="/delete-route" element={<DeleteRoute />} />
          <Route path="/add-schedule" element={<AddSchedule />} />
          <Route path="/delete-schedule" element={<DeleteSchedule />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
