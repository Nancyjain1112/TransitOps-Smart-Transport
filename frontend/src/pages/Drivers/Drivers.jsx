import "./Drivers.css";

function Drivers() {

const drivers=[
{id:1,name:"Rahul Patel",phone:"9876543210",license:"GJ202401",status:"Available"},
{id:2,name:"Amit Shah",phone:"9988776655",license:"GJ202402",status:"On Trip"},
{id:3,name:"Vivek Kumar",phone:"8899776655",license:"GJ202403",status:"Leave"}
];

return(

<div className="page">

<h2>Driver Management</h2>

<button className="add-btn">+ Add Driver</button>

<table>

<thead>

<tr>

<th>ID</th>
<th>Name</th>
<th>Phone</th>
<th>License</th>
<th>Status</th>

</tr>

</thead>

<tbody>

{drivers.map(driver=>(

<tr key={driver.id}>

<td>{driver.id}</td>
<td>{driver.name}</td>
<td>{driver.phone}</td>
<td>{driver.license}</td>
<td>{driver.status}</td>

</tr>

))}

</tbody>

</table>

</div>

)

}

export default Drivers;