function Reports(){

return(

<div className="page">

<h2>Reports</h2>

<div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"20px"}}>

<div className="card">
<h3>Vehicle Report</h3>
<button className="add-btn">Download</button>
</div>

<div className="card">
<h3>Driver Report</h3>
<button className="add-btn">Download</button>
</div>

<div className="card">
<h3>Expense Report</h3>
<button className="add-btn">Download</button>
</div>

</div>

</div>

)

}

export default Reports;