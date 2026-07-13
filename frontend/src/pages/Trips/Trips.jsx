import { useEffect, useState } from "react";
import api from "../../services/api";
import "./Trips.css";

function Trips() {

  const [trips, setTrips] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [drivers, setDrivers] = useState([]);

  const [form, setForm] = useState({
    vehicle_id: "",
    driver_id: "",
    source: "",
    destination: "",
    cargo_weight: "",
    planned_distance: "",
    revenue: ""
  });

  useEffect(() => {
    loadTrips();
    loadVehicles();
    loadDrivers();
  }, []);

  const loadTrips = async () => {
    const res = await api.get("/trips");
    setTrips(res.data);
  };

  const loadVehicles = async () => {
    const res = await api.get("/vehicles");
    setVehicles(res.data.filter(v => v.status === "Available"));
  };

  const loadDrivers = async () => {
    const res = await api.get("/drivers");
    setDrivers(res.data.filter(d => d.status === "Available"));
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const createTrip = async (e) => {

    e.preventDefault();

    try {

      await api.post("/trips", form);

      alert("Trip Created Successfully");

      setForm({
        vehicle_id: "",
        driver_id: "",
        source: "",
        destination: "",
        cargo_weight: "",
        planned_distance: "",
        revenue: ""
      });

      loadTrips();
      loadVehicles();
      loadDrivers();

    } catch (err) {

      alert(err.response?.data?.message || "Failed");

    }

  };

  return (

    <div className="page">

      <h2>Trip Management</h2>

      <form className="trip-form" onSubmit={createTrip}>

        <select
          name="vehicle_id"
          value={form.vehicle_id}
          onChange={handleChange}
          required
        >

          <option value="">Select Vehicle</option>

          {vehicles.map(v => (

            <option key={v.id} value={v.id}>
              {v.vehicle_name}
            </option>

          ))}

        </select>

        <select
          name="driver_id"
          value={form.driver_id}
          onChange={handleChange}
          required
        >

          <option value="">Select Driver</option>

          {drivers.map(d => (

            <option key={d.id} value={d.id}>
              {d.full_name}
            </option>

          ))}

        </select>

        <input
          name="source"
          placeholder="Source"
          value={form.source}
          onChange={handleChange}
          required
        />

        <input
          name="destination"
          placeholder="Destination"
          value={form.destination}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="cargo_weight"
          placeholder="Cargo Weight"
          value={form.cargo_weight}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="planned_distance"
          placeholder="Distance"
          value={form.planned_distance}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="revenue"
          placeholder="Revenue"
          value={form.revenue}
          onChange={handleChange}
          required
        />

        <button>Create Trip</button>

      </form>

      <table>

        <thead>

          <tr>

            <th>ID</th>
            <th>Vehicle</th>
            <th>Driver</th>
            <th>Source</th>
            <th>Destination</th>
            <th>Cargo</th>
            <th>Distance</th>
            <th>Status</th>

          </tr>

        </thead>

        <tbody>

          {trips.map((trip) => (

            <tr key={trip.id}>

              <td>{trip.id}</td>
              <td>{trip.vehicle}</td>
              <td>{trip.driver}</td>
              <td>{trip.source}</td>
              <td>{trip.destination}</td>
              <td>{trip.cargo_weight}</td>
              <td>{trip.planned_distance}</td>
              <td>
                <span className={trip.status === "Running" ? "running" : "completed"}>
                  {trip.status}
                </span>
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}

export default Trips;