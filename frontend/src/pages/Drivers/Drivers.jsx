import { useEffect, useState } from "react";
import api from "../../services/api";
import "./Drivers.css";

function Drivers() {

  const emptyForm = {
    full_name: "",
    license_number: "",
    license_category: "",
    license_expiry: "",
    contact_number: "",
    safety_score: 100,
    status: "Available"
  };

  const [drivers, setDrivers] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadDrivers();
  }, []);

  const loadDrivers = async () => {
    const res = await api.get("/drivers");
    setDrivers(res.data);
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const saveDriver = async (e) => {

    e.preventDefault();

    if (editingId) {

      await api.put(`/drivers/${editingId}`, {
        full_name: form.full_name,
        contact_number: form.contact_number,
        status: form.status
      });

      alert("Driver Updated");

    } else {

      await api.post("/drivers", form);

      alert("Driver Added");

    }

    setEditingId(null);
    setForm(emptyForm);

    loadDrivers();

  };

  const editDriver = (driver) => {

    setEditingId(driver.id);

    setForm(driver);

  };

  const deleteDriver = async (id) => {

    if (!window.confirm("Delete Driver?")) return;

    await api.delete(`/drivers/${id}`);

    loadDrivers();

  };

  return (

    <div className="page">

      <h2>👨‍✈️ Driver Management</h2>

      <form className="vehicle-form" onSubmit={saveDriver}>

        <input
          name="full_name"
          placeholder="Full Name"
          value={form.full_name}
          onChange={handleChange}
        />

        <input
          name="license_number"
          placeholder="License Number"
          value={form.license_number}
          onChange={handleChange}
        />

        <input
          name="license_category"
          placeholder="License Category"
          value={form.license_category}
          onChange={handleChange}
        />

        <input
          type="date"
          name="license_expiry"
          value={form.license_expiry}
          onChange={handleChange}
        />

        <input
          name="contact_number"
          placeholder="Contact Number"
          value={form.contact_number}
          onChange={handleChange}
        />

        <input
          name="safety_score"
          placeholder="Safety Score"
          value={form.safety_score}
          onChange={handleChange}
        />

        <button>

          {editingId ? "Update Driver" : "Add Driver"}

        </button>

      </form>

      <table className="vehicle-table">

        <thead>

          <tr>

            <th>ID</th>

            <th>Name</th>

            <th>License</th>

            <th>Category</th>

            <th>Expiry</th>

            <th>Contact</th>

            <th>Score</th>

            <th>Status</th>

            <th>Action</th>

          </tr>

        </thead>

        <tbody>

          {drivers.map((driver) => (

            <tr key={driver.id}>

              <td>{driver.id}</td>

              <td>{driver.full_name}</td>

              <td>{driver.license_number}</td>

              <td>{driver.license_category}</td>

              <td>{driver.license_expiry}</td>

              <td>{driver.contact_number}</td>

              <td>{driver.safety_score}</td>

              <td>{driver.status}</td>

              <td>

                <button
                  className="edit-btn"
                  onClick={() => editDriver(driver)}
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() => deleteDriver(driver.id)}
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

export default Drivers;