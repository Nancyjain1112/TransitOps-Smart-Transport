import { useEffect, useState } from "react";
import api from "../../services/api";
import "./Vehicles.css";

function Vehicles() {

  const emptyForm = {
    registration_number: "",
    vehicle_name: "",
    vehicle_type: "",
    max_load_capacity: "",
    odometer: "",
    acquisition_cost: "",
    status: "Available",
  };

  const [vehicles, setVehicles] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadVehicles();
  }, []);

  const loadVehicles = async () => {
    try {
      const res = await api.get("/vehicles");
      setVehicles(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const saveVehicle = async (e) => {
    e.preventDefault();

    try {

      if (editingId) {

        await api.put(`/vehicles/${editingId}`, form);

        alert("Vehicle Updated");

      } else {

        await api.post("/vehicles", form);

        alert("Vehicle Added");

      }

      setForm(emptyForm);
      setEditingId(null);
      loadVehicles();

    } catch (err) {
      alert("Operation Failed");
      console.log(err);
    }
  };

  const editVehicle = (vehicle) => {

    setEditingId(vehicle.id);

    setForm({
      registration_number: vehicle.registration_number,
      vehicle_name: vehicle.vehicle_name,
      vehicle_type: vehicle.vehicle_type,
      max_load_capacity: vehicle.max_load_capacity,
      odometer: vehicle.odometer,
      acquisition_cost: vehicle.acquisition_cost,
      status: vehicle.status,
    });

  };

  const deleteVehicle = async (id) => {

    if (!window.confirm("Delete Vehicle?")) return;

    await api.delete(`/vehicles/${id}`);

    loadVehicles();

  };

  return (

    <div className="page">

      <h2>🚚 Vehicle Management</h2>

      <form className="vehicle-form" onSubmit={saveVehicle}>

        <input
          name="registration_number"
          placeholder="Registration Number"
          value={form.registration_number}
          onChange={handleChange}
        />

        <input
          name="vehicle_name"
          placeholder="Vehicle Name"
          value={form.vehicle_name}
          onChange={handleChange}
        />

        <input
          name="vehicle_type"
          placeholder="Vehicle Type"
          value={form.vehicle_type}
          onChange={handleChange}
        />

        <input
          name="max_load_capacity"
          placeholder="Load Capacity"
          value={form.max_load_capacity}
          onChange={handleChange}
        />

        <input
          name="odometer"
          placeholder="Odometer"
          value={form.odometer}
          onChange={handleChange}
        />

        <input
          name="acquisition_cost"
          placeholder="Acquisition Cost"
          value={form.acquisition_cost}
          onChange={handleChange}
        />

        <button type="submit">
          {editingId ? "Update Vehicle" : "Add Vehicle"}
        </button>

      </form>

      <table className="vehicle-table">

        <thead>

          <tr>
            <th>ID</th>
            <th>Registration</th>
            <th>Name</th>
            <th>Type</th>
            <th>Capacity</th>
            <th>Odometer</th>
            <th>Cost</th>
            <th>Status</th>
            <th>Action</th>
          </tr>

        </thead>

        <tbody>

          {vehicles.map((v) => (

            <tr key={v.id}>

              <td>{v.id}</td>
              <td>{v.registration_number}</td>
              <td>{v.vehicle_name}</td>
              <td>{v.vehicle_type}</td>
              <td>{v.max_load_capacity}</td>
              <td>{v.odometer}</td>
              <td>₹ {v.acquisition_cost}</td>
              <td>{v.status}</td>

              <td>

                <button
                  className="edit-btn"
                  onClick={() => editVehicle(v)}
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() => deleteVehicle(v.id)}
                >
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}

export default Vehicles;