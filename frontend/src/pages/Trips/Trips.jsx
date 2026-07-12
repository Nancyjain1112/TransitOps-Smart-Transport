function Trips(){

const trips=[
{id:1,vehicle:"Tata Ace",driver:"Rahul",from:"Ahmedabad",to:"Surat",status:"Running"},
{id:2,vehicle:"Ashok Leyland",driver:"Amit",from:"Vadodara",to:"Rajkot",status:"Completed"}
];

return(

<div className="page">

<h2>Trip Management</h2>

<button className="add-btn">+ Create Trip</button>

<table>

<thead>

<tr>

<th>ID</th>
<th>Vehicle</th>
<th>Driver</th>
<th>From</th>
<th>To</th>
<th>Status</th>

</tr>

</thead>

<tbody>

{trips.map(t=>(

<tr key={t.id}>

<td>{t.id}</td>
<td>{t.vehicle}</td>
<td>{t.driver}</td>
<td>{t.from}</td>
<td>{t.to}</td>
<td>{t.status}</td>

</tr>

))}

</tbody>

</table>

</div>

)

}

export default Trips;