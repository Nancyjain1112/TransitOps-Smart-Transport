from flask import Blueprint, jsonify
from models import Vehicle, Driver, Trip, Fuel, Maintenance, Expense

dashboard_bp = Blueprint("dashboard", __name__)


@dashboard_bp.route("/dashboard", methods=["GET"])
def dashboard():

    total_vehicles = Vehicle.query.count()
    total_drivers = Driver.query.count()

    total_trips = Trip.query.count()

    active_trips = Trip.query.filter_by(status="Running").count()

    available_vehicles = Vehicle.query.filter_by(status="Available").count()

    maintenance_vehicles = Vehicle.query.filter_by(status="In Shop").count()

    fuel_cost = sum([f.cost for f in Fuel.query.all()])

    maintenance_cost = sum([m.cost for m in Maintenance.query.all()])

    other_expense = sum([e.amount for e in Expense.query.all()])

    revenue = sum([t.revenue for t in Trip.query.all()])

    profit = revenue - fuel_cost - maintenance_cost - other_expense

    return jsonify({

        "total_vehicles": total_vehicles,

        "total_drivers": total_drivers,

        "total_trips": total_trips,

        "active_trips": active_trips,

        "available_vehicles": available_vehicles,

        "maintenance_vehicles": maintenance_vehicles,

        "fuel_cost": fuel_cost,

        "maintenance_cost": maintenance_cost,

        "other_expense": other_expense,

        "revenue": revenue,

        "profit": profit

    })