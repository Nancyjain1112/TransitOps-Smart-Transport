from flask import Blueprint, request, jsonify
from database.db import db
from models import Trip, Vehicle, Driver

trip_bp = Blueprint("trip", __name__)

@trip_bp.route("/trips", methods=["POST"])
def create_trip():

    data = request.get_json()

    vehicle = Vehicle.query.get(data["vehicle_id"])
    driver = Driver.query.get(data["driver_id"])

    if vehicle is None:
        return jsonify({"message": "Vehicle not found"}), 404

    if driver is None:
        return jsonify({"message": "Driver not found"}), 404

    if vehicle.status != "Available":
        return jsonify({"message": "Vehicle is not available"}), 400

    if driver.status != "Available":
        return jsonify({"message": "Driver is not available"}), 400

    trip = Trip(
        source=data["source"],
        destination=data["destination"],
        cargo_weight=data["cargo_weight"],
        planned_distance=data["planned_distance"],
        actual_distance=0,
        fuel_consumed=0,
        revenue=data["revenue"],
        start_odometer=vehicle.odometer,
        end_odometer=vehicle.odometer,
        status="Running",
        vehicle_id=vehicle.id,
        driver_id=driver.id
    )

    vehicle.status = "On Trip"
    driver.status = "On Trip"

    db.session.add(trip)
    db.session.commit()

    return jsonify({
        "message": "Trip Created Successfully"
    }), 201

@trip_bp.route("/trips", methods=["GET"])
def get_trips():

    trips = Trip.query.all()

    result = []

    for trip in trips:

        result.append({

            "id": trip.id,

            "vehicle": trip.vehicle.vehicle_name,

            "driver": trip.driver.full_name,

            "source": trip.source,

            "destination": trip.destination,

            "cargo_weight": trip.cargo_weight,

            "planned_distance": trip.planned_distance,

            "status": trip.status

        })

    return jsonify(result)

@trip_bp.route("/trips/<int:id>/complete", methods=["PUT"])
def complete_trip(id):

    trip = Trip.query.get_or_404(id)

    data = request.get_json()

    trip.actual_distance = data["actual_distance"]
    trip.end_odometer = data["end_odometer"]
    trip.fuel_consumed = data["fuel_consumed"]
    trip.status = "Completed"

    vehicle = Vehicle.query.get(trip.vehicle_id)
    driver = Driver.query.get(trip.driver_id)

    vehicle.odometer = trip.end_odometer
    vehicle.status = "Available"

    driver.status = "Available"

    db.session.commit()

    return jsonify({
        "message": "Trip Completed Successfully"
    })

