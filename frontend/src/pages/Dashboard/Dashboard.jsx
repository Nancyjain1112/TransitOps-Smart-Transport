import "./Dashboard.css";

function Dashboard() {

const cards=[

{

title:"Vehicles",

value:"120",

color:"#2563eb"

},

{

title:"Drivers",

value:"45",

color:"#16a34a"

},

{

title:"Trips",

value:"560",

color:"#f97316"

},

{

title:"Revenue",

value:"₹8.2 L",

color:"#9333ea"

}

];

return(

<div>

<h1 className="page-title">

Dashboard

</h1>

<div className="cards">

{

cards.map((card,index)=>(

<div
className="card"
key={index}
style={{borderLeft:`8px solid ${card.color}`}}
>

<h2>

{card.value}

</h2>

<p>

{card.title}

</p>

</div>

))

}

</div>

<div className="grid">

<div className="left-box">

<h2>

Fleet Status

</h2>

<table>

<thead>

<tr>

<th>Vehicle</th>

<th>Status</th>

</tr>

</thead>

<tbody>

<tr>

<td>Tata Ace</td>

<td className="green">

Available

</td>

</tr>

<tr>

<td>Ashok Leyland</td>

<td className="orange">

On Trip

</td>

</tr>

<tr>

<td>Mahindra Bolero</td>

<td className="red">

Maintenance

</td>

</tr>

</tbody>

</table>

</div>

<div className="right-box">

<h2>

AI Fleet Insights

</h2>

<ul>

<li>

✅ Fuel cost decreased by 8%

</li>

<li>

⚠ Vehicle GJ01AB1234 service due

</li>

<li>

🚛 Driver Rahul completed 18 trips

</li>

<li>

📈 Revenue increased this month

</li>

</ul>

</div>

</div>

</div>

)

}

export default Dashboard