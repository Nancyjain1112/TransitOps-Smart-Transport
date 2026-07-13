import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Fuel from "./pages/Fuel/Fuel";

import Vehicles from "./pages/Vehicles/Vehicles";
import Drivers from "./pages/Drivers/Drivers";
import Trips from "./pages/Trips/Trips";
import Maintenance from "./pages/Maintenance/Maintenance";
import Expenses from "./pages/Expenses/Expenses";
import Reports from "./pages/Reports/Reports";
import Profile from "./pages/Profile/Profile";

import MainLayout from "./layouts/MainLayout";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Login />} />

        <Route element={<MainLayout />}>

          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/vehicles" element={<Vehicles />} />

          <Route path="/drivers" element={<Drivers />} />

          <Route path="/trips" element={<Trips />} />

          <Route path="/fuel" element={<Fuel />} />

          <Route path="/maintenance" element={<Maintenance />} />

          <Route path="/expenses" element={<Expenses />} />

          <Route path="/reports" element={<Reports />} />

          <Route path="/profile" element={<Profile />} />

        </Route>

        <Route path="*" element={<Navigate to="/" />} />

      </Routes>

    </BrowserRouter>

  )

}

export default App