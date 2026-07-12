import { useEffect, useState } from "react";
import api from "../../services/api";
import "./Vehicles.css";

function Vehicles() {

const [vehicles,setVehicles]=useState([]);

const [form,setForm]=useState({
registration_number:"",
vehicle_name:"",
vehicle_type:"",
max_load_capacity:"",
odometer:"",
acquisition_cost:""
});

useEffect(()=>{
loadVehicles();
},[]);

const loadVehicles=async()=>{

const res=await api.get("/vehicles");

setVehicles(res.data);

};

const handleChange=(e)=>{

setForm({...form,[e.target.name]:e.target.value});

};

const saveVehicle=async(e)=>{

e.preventDefault();

await api.post("/vehicles",form);

alert("Vehicle Added");

setForm({
registration_number:"",
vehicle_name:"",
vehicle_type:"",
max_load_capacity:"",
odometer:"",
acquisition_cost:""
});

loadVehicles();

};

return(

<div className="page">

<h2>Vehicle Management</h2>

<form onSubmit={saveVehicle}>

<input name="registration_number" placeholder="Registration Number" onChange={handleChange} value={form.registration_number}/>

<input name="vehicle_name" placeholder="Vehicle Name" onChange={handleChange} value={form.vehicle_name}/>

<input name="vehicle_type" placeholder="Vehicle Type" onChange={handleChange} value={form.vehicle_type}/>

<input name="max_load_capacity" placeholder="Capacity" onChange={handleChange} value={form.max_load_capacity}/>

<input name="odometer" placeholder="Odometer" onChange={handleChange} value={form.odometer}/>

<input name="acquisition_cost" placeholder="Cost" onChange={handleChange} value={form.acquisition_cost}/>

<button>Add Vehicle</button>

</form>

<table>

<thead>

<tr>

<th>ID</th>

<th>Name</th>

<th>Registration</th>

<th>Status</th>

</tr>

</thead>

<tbody>

{vehicles.map(v=>(

<tr key={v.id}>

<td>{v.id}</td>

<td>{v.vehicle_name}</td>

<td>{v.registration_number}</td>

<td>{v.status}</td>

</tr>

))}

</tbody>

</table>

</div>

);

}

export default Vehicles;