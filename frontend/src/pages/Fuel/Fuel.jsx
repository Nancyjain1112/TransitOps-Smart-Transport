import { useEffect, useState } from "react";
import api from "../../services/api";
import "./Fuel.css";

function Fuel() {

  const [fuelLogs, setFuelLogs] = useState([]);
  const [vehicles, setVehicles] = useState([]);

  const [form, setForm] = useState({
    vehicle_id: "",
    liters: "",
    cost: ""
  });

  useEffect(() => {
    loadFuel();
    loadVehicles();
  }, []);

  const loadFuel = async () => {
    const res = await api.get("/fuel");
    setFuelLogs(res.data);
  };

  const loadVehicles = async () => {
    const res = await api.get("/vehicles");
    setVehicles(res.data);
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const addFuel = async (e) => {

    e.preventDefault();

    try {

      await api.post("/fuel", form);

      alert("Fuel Added Successfully");

      setForm({
        vehicle_id: "",
        liters: "",
        cost: ""
      });

      loadFuel();

    } catch (err) {

      alert(err.response?.data?.message || "Error");

    }

  };

  return (

    <div className="page">

      <h2>Fuel Management</h2>

      <form className="fuel-form" onSubmit={addFuel}>

        <select
          name="vehicle_id"
          value={form.vehicle_id}
          onChange={handleChange}
          required
        >

          <option value="">Select Vehicle</option>

          {vehicles.map(vehicle => (

            <option
              key={vehicle.id}
              value={vehicle.id}
            >
              {vehicle.vehicle_name}
            </option>

          ))}

        </select>

        <input
          type="number"
          name="liters"
          placeholder="Fuel (Liters)"
          value={form.liters}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="cost"
          placeholder="Fuel Cost"
          value={form.cost}
          onChange={handleChange}
          required
        />

        <button>Add Fuel</button>

      </form>

      <table>

        <thead>

          <tr>

            <th>ID</th>
            <th>Vehicle</th>
            <th>Liters</th>
            <th>Cost</th>
            <th>Date</th>

          </tr>

        </thead>

        <tbody>

          {fuelLogs.map(log => (

            <tr key={log.id}>

              <td>{log.id}</td>

              <td>{log.vehicle}</td>

              <td>{log.liters} L</td>

              <td>₹ {log.cost}</td>

              <td>{log.date}</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}

export default Fuel;